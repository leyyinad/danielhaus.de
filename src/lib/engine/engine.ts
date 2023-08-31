import Shader from "./shader";
import vert from './shader.vert';
import frag from './shader.frag';
import { mat4, vec3 } from 'gl-matrix';

export default class Engine {
  window: Window;
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  shaders: { [name: string]: Shader; };
  positionBuffer: WebGLBuffer | null;
  indexBuffer: WebGLBuffer | null;
  aspect = 1.0;
  positions: Float32Array;
  indices: Uint16Array;

  listeners: { [name: string]: () => void; };

  dims: { w: number, h: number, r: number; };

  constructor(window: Window, canvas: HTMLCanvasElement,
    positions: Float32Array, indices: Uint16Array) {

    this.window = window;
    this.canvas = canvas;
    this.positions = new Float32Array(positions);
    this.indices = new Uint16Array(indices);

    this.dims = { w: 1, h: 1, r: 1 };

    this.gl = canvas.getContext('webgl2')!;
    this.shaders = {};
    this.positionBuffer = null;
    this.indexBuffer = null;

    this.listeners = {};

    this.listeners.resize = () => this.resize();
    this.window.addEventListener('resize', this.listeners.resize);
  }

  cleanup() {
    this.window.removeEventListener('resize', this.listeners.resize);
  }

  resize() {
    const { gl, canvas, window, dims } = this;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const r = window.devicePixelRatio;

    if (w !== dims.w || h !== dims.h || r !== dims.r) {
      canvas.width = w * r;
      canvas.height = h * r;

      this.aspect = w / Math.max(h, 1);

      this.dims = { w, h, r };

      gl.viewport(0, 0, w * r, h * r);
    }
  }

  run() {
    this.initShader();
    this.initPositionBuffer();
    this.initIndexBuffer();

    this.resize();
    this.window.requestAnimationFrame(t => this.loop(t));
  }

  initShader() {
    this.shaders.white = new Shader(
      this.gl,
      vert,
      frag,
      {
        vertexPosition: "a_vertex_position",
      },
      {
        projectionMatrix: "u_projection_matrix",
        modelViewMatrix: "u_model_view_matrix",
      }
    );
  }

  initPositionBuffer() {
    const { gl } = this;

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
  }

  initIndexBuffer() {
    const { gl } = this;

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
  }

  loop(time: DOMHighResTimeStamp) {
    this.render(time);
    this.window.requestAnimationFrame(t => this.loop(t));
  }

  render(time: DOMHighResTimeStamp) {
    const { gl } = this;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.drawScene(time);
  }

  createProjectionMatrix(time: DOMHighResTimeStamp): mat4 {
    const fieldOfView = (45 * Math.PI) / 180;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, this.aspect, zNear, zFar);
    return projectionMatrix;
  }

  createModelViewMatrix(time: DOMHighResTimeStamp): mat4 {
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

    const axis = vec3.fromValues(1.0, 1.0, 1.0);
    vec3.normalize(axis, axis);
    mat4.rotate(modelViewMatrix, modelViewMatrix, (-0.001 * time) % 360,
      axis);
    return modelViewMatrix;
  }

  drawScene(time: DOMHighResTimeStamp) {
    const { gl } = this;

    const projectionMatrix = this.createProjectionMatrix(time);
    const modelViewMatrix = this.createModelViewMatrix(time);
    const shader = this.shaders.white;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    const { vertexPosition } = shader.locations.attrib;

    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    shader.use();
    shader.setUniformMatrices({ projectionMatrix, modelViewMatrix });

    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }
}
