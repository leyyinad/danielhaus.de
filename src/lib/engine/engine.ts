import Shader from "./shader";
import vert from './shader.vert';
import frag from './shader.frag';
import { mat4 } from 'gl-matrix';
import city from './city';

export default class Engine {
  window: Window;
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  shaders: { [name: string]: Shader; };
  positionBuffer: WebGLBuffer | null;
  barycentricBuffer: WebGLBuffer | null;
  indexBuffer: WebGLBuffer | null;
  aspect = 1.0;
  positions: Float32Array;
  indices: Uint16Array;
  barycentric: Float32Array;
  running = false;

  listeners: { [name: string]: () => void; };

  viewportDimensions: { w: number, h: number, r: number; };

  constructor(
    window: Window,
    canvas: HTMLCanvasElement,
    positions: Array<[number, number, number]>,
    cells: Array<[number, number, number]>) {

    this.window = window;
    this.canvas = canvas;

    this.positions = new Float32Array();
    this.indices = new Uint16Array();
    this.barycentric = new Float32Array();

    this.initGeometry(positions, cells);

    this.viewportDimensions = { w: 1, h: 1, r: 1 };

    this.gl = canvas.getContext('webgl2')!;
    this.shaders = {};
    this.positionBuffer = null;
    this.barycentricBuffer = null;
    this.indexBuffer = null;

    this.listeners = {};
    this.listeners.resize = () => this.resize();
    this.window.addEventListener('resize', this.listeners.resize);
  }

  cleanup() {
    this.stop();
    this.window.removeEventListener('resize', this.listeners.resize);

    const { gl } = this;
    Object.values(this.shaders).forEach(shader => shader.cleanup());
    this.shaders = {};

    gl.deleteBuffer(this.positionBuffer);
    gl.deleteBuffer(this.barycentricBuffer);
    gl.deleteBuffer(this.indexBuffer);
  }

  stop() {
    this.running = false;
  }

  initGeometry(positions: [number, number, number][], cells: [number, number, number][]) {
    const poss: number[][] = [];
    const idxs: number[] = [];
    const brys: number[][] = [];

    const l = cells.length;

    let c = 0;
    for (let i = 0; i < l; i++) {
      const cell = cells[i];
      poss.push(positions[cell[0]]);
      poss.push(positions[cell[1]]);
      poss.push(positions[cell[2]]);

      brys.push([1, 0, 0]);
      brys.push([0, 1, 0]);
      brys.push([0, 0, 1]);

      idxs.push(c++);
      idxs.push(c++);
      idxs.push(c++);
    }

    this.positions = new Float32Array(poss.flat());
    this.indices = new Uint16Array(idxs);
    this.barycentric = new Float32Array(brys.flat());
  }

  resize() {
    const { gl, canvas, window, viewportDimensions } = this;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const r = window.devicePixelRatio;

    if (w !== viewportDimensions.w || h !== viewportDimensions.h || r !== viewportDimensions.r) {
      canvas.width = w * r;
      canvas.height = h * r;

      this.aspect = w / Math.max(h, 1);

      this.viewportDimensions = { w, h, r };

      gl.viewport(0, 0, w * r, h * r);
    }
  }

  init() {
    this.initShader();
    this.initPositionBuffer();
    this.initBarycentricBuffer();
    this.initIndexBuffer();

    this.resize();
  }

  initShader() {
    this.shaders.white = new Shader(
      this.gl,
      vert,
      frag,
      {
        position: "a_vertex_position",
        barycentric: "a_barycentric",
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

  initBarycentricBuffer() {
    const { gl } = this;

    this.barycentricBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.barycentricBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.barycentric, gl.STATIC_DRAW);
  }

  initIndexBuffer() {
    const { gl } = this;

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
  }

  start() {
    this.running = true;
    this.window.requestAnimationFrame(t => this.loop(t));
  }

  loop(time: DOMHighResTimeStamp) {
    if (this.running) {
      this.render(time);
      this.window.requestAnimationFrame(t => this.loop(t));
    }
  }

  render(time: DOMHighResTimeStamp) {
    const { gl } = this;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);

    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);

    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.drawScene(time);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // -4, 0 -> 4, 12
    let x = 0.0;
    let z = 0.0;

    const speed = 1.0;
    const t = (time * 0.001 * speed) % 16.0;

    x = 0.0;
    z = t * 0.8;

    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.5 - x, -2.75, -6.0 + z]);


    return modelViewMatrix;
  }

  drawScene(time: DOMHighResTimeStamp) {
    const { gl } = this;

    const projectionMatrix = this.createProjectionMatrix(time);
    const modelViewMatrix = this.createModelViewMatrix(time);
    const shader = this.shaders.white;

    const { position, barycentric } = shader.locations.attrib;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.barycentricBuffer);
    gl.vertexAttribPointer(barycentric, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(barycentric);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    shader.use();
    shader.setUniformMatrices({ projectionMatrix, modelViewMatrix });

    {
      const elementCount = this.indices.length;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;

      const rowTransform = mat4.create();
      const posTransform = mat4.create();

      const cityWidth = city[0].length;

      const cellSize = 1.25;
      const scaleFactor = 0.5;

      city.forEach((row, j) => {
        mat4.translate(rowTransform, modelViewMatrix, [
          -Math.floor(cityWidth * 0.5) * cellSize, 0.0, -j * cellSize]);

        row.forEach((v, i) => {
          mat4.translate(posTransform, rowTransform, [i * cellSize, 0.0, 0.0]);

          if (v > 0) {
            mat4.scale(posTransform, posTransform, [1.0, v * scaleFactor, 1.0]);
            shader.setUniformMatrices({ modelViewMatrix: posTransform });
            gl.drawElements(gl.TRIANGLES, elementCount, type, offset);
          }
        });
      });
    }
  }
}
