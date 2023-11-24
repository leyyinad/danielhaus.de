import { mat4 } from 'gl-matrix';
import { UniformType } from '../../../city/materials/wireframe/material';
import Camera from '../../components/camera/camera';
import MeshFilter from '../../components/mesh/mesh-filter';
import Environment from '../../components/renderer/environment';
import MeshRenderer from '../../components/renderer/mesh-renderer';
import Renderer from '../../components/renderer/renderer';
import type Engine from '../../engine';
import MatrixStack from '../../geom/matrix-stack';
import type Mesh from '../../geom/mesh';
import { BufferType } from '../../geom/mesh';
import BaseObject from '../../object';
import type Shader from '../../renderer/shader';
import type RenderDriver from '../render-driver';
import BufferMap from './buffer-map';
import ShaderCompiler from './shader-compiler';
import ShaderInfo from './shader-info';

export default class WebGLRenderDriver implements RenderDriver {
  engine!: Engine;
  context: WebGL2RenderingContext | undefined;
  shaders: Map<Shader, ShaderInfo> = new Map();
  stack: MatrixStack = new MatrixStack();
  buffers: BufferMap<WebGLBuffer> = new BufferMap();

  projection = mat4.create();
  modelView = mat4.create();

  constructor(public canvas: HTMLCanvasElement) {
    try {
      this.context = canvas.getContext('webgl2')!;
    } catch (e) {
      return;
    }
  }

  isSupported() {
    return this.context != null;
  }

  init() {
    this.initShaders();
    this.initBuffers();
  }

  initShaders() {
    const compiler = new ShaderCompiler(this);

    BaseObject.objects.forEach(
      (o) =>
        o
          .getComponent(Renderer)
          ?.materials.forEach(({ shader }) => this.compileShader(shader, compiler))
    );
  }

  compileShader(shader: Shader, compiler: ShaderCompiler) {
    const { gl } = this;

    const info = new ShaderInfo();
    info.program = compiler.compile(shader);

    if (info.program == null) return;

    this.shaders.set(shader, info);

    shader.attributes.forEach((value, key) =>
      info.attributes.set(key, gl.getAttribLocation(info.program!, value))
    );

    shader.uniforms.forEach(([value, type], key) =>
      info.uniforms.set(key, [gl.getUniformLocation(info.program!, value)!, type])
    );
  }

  initBuffers() {
    const { gl } = this;

    for (const object of BaseObject.objects) {
      const mesh = object.getComponent(MeshFilter)?.mesh;

      if (mesh == null) continue;

      for (const bufferType of mesh.buffers) {
        this.createBuffer(mesh, bufferType, this.bufferTarget(bufferType), gl.STATIC_DRAW);
      }
    }
  }

  bufferTarget(bufferType: BufferType) {
    const { gl } = this;

    return bufferType !== BufferType.TRIANGLE ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
  }

  createBuffer(mesh: Mesh, type: BufferType, target: GLenum, usage: GLenum) {
    const { gl } = this;

    const data = mesh.bufferArray(type);
    if (data != null) {
      const buffer = gl.createBuffer()!;
      gl.bindBuffer(target, buffer);
      gl.bufferData(target, data, usage, 0);

      this.buffers.set(mesh, type, buffer);
    } else {
      console.warn('Buffer', BufferType[type], type, 'is null');
    }
  }

  viewport(x: number, y: number, width: number, height: number): void {
    const { gl } = this;

    gl.viewport(x, y, width, height);
  }

  resize() {
    const { canvas } = this;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const r = window.devicePixelRatio;

    canvas.width = w * r;
    canvas.height = h * r;

    this.engine.viewport(0, 0, w * r, h * r);
  }

  clear() {
    const { gl } = this;

    const camera = Camera.main!;
    const env = camera.getComponent(Environment);

    if (env != null) {
      const bgColor = env.bgColor as [number, number, number, number];
      gl.clearColor(...bgColor);
    }

    gl.clearDepth(1.0);

    gl.disable(gl.DEPTH_TEST); // make configurable
    gl.depthMask(false);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  run(callback: FrameRequestCallback) {
    window.requestAnimationFrame(callback);
  }

  loop(callback: FrameRequestCallback) {
    if (this.engine.throttle === 0) {
      window.requestAnimationFrame(callback);
    } else {
      setTimeout(() => {
        window.requestAnimationFrame(callback);
      }, this.engine.throttle);
    }
  }

  render() {
    const camera = Camera.main!;
    mat4.copy(this.projection, camera.projection);
    mat4.copy(this.modelView, camera.transform.matrix);

    const { stack } = this;

    stack.push(mat4.clone(this.modelView));

    this.engine.scene.getRootObjects().forEach((o) => this.renderHierarchy(o));

    stack.pop();
    mat4.copy(this.modelView, stack.current);
  }

  renderHierarchy(o: BaseObject) {
    const { stack } = this;

    mat4.multiply(this.modelView, stack.current, o.transform.matrix);
    stack.push(mat4.clone(this.modelView));

    o.children.filter((c) => c.active).forEach((c) => this.renderHierarchy(c));

    this.renderObject(o);

    stack.pop();
    mat4.copy(this.modelView, stack.current);
  }

  renderObject(o: BaseObject) {
    const renderer = o.getComponent(MeshRenderer);
    if (!renderer?.enabled) {
      return;
    }

    // TODO: support submeshes
    const mesh = o.getComponent(MeshFilter)?.mesh;
    const material = renderer.material;

    if (mesh?.triangles != null && material != null) {
      const info = this.shaders.get(material?.shader);

      if (info?.program == null) return;

      this.bindBuffers(info, mesh);
      this.useShader(info!.program!, info);
      this.drawElements(mesh.triangles.length);
    }
  }

  protected bindBuffers(info: ShaderInfo, mesh: Mesh) {
    const { gl } = this;

    for (const bufferType of mesh.buffers) {
      const buffer = this.buffers.get(mesh, bufferType);
      if (buffer != null) {
        const attrib = info!.attributes.get(bufferType)!;
        gl.bindBuffer(this.bufferTarget(bufferType), buffer);
        if (bufferType !== BufferType.TRIANGLE) {
          gl.vertexAttribPointer(attrib, mesh.bufferItemSize(bufferType), gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(attrib);
        }
      }
    }
  }

  protected useShader(program: WebGLProgram, info: ShaderInfo) {
    const { gl } = this;

    gl.useProgram(program);

    info?.uniforms.forEach(([loc, type], key) => {
      switch (type) {
        case UniformType.MAT4:
          switch (key) {
            case 'projection':
              gl.uniformMatrix4fv(loc, false, this.projection);
              break;
            case 'modelView':
              gl.uniformMatrix4fv(loc, false, this.modelView);
              break;
            default:
          }
          break;

        default:
      }
    });
  }

  protected drawElements(count: number) {
    const { gl } = this;

    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }

  get gl() {
    return this.context!;
  }
}
