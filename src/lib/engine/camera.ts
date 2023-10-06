import { mat4, vec3 } from 'gl-matrix';

export default class Camera {
  projectionMatrix: mat4;
  modelViewMatrix: mat4;
  aspect: number;
  fieldOfView: number;
  zNear: number;
  zFar: number;

  constructor(
    fieldOfView = (45 * Math.PI) / 180,
    zNear = 0.1,
    zFar = 100.0,
    aspect = 1.0,
  ) {
    this.fieldOfView = fieldOfView;
    this.zNear = zNear;
    this.zFar = zFar;
    this.aspect = aspect;

    this.projectionMatrix = mat4.create();
    this.modelViewMatrix = mat4.create();

    this.update();
  }

  update() {
    mat4.perspective(
      this.projectionMatrix,
      this.fieldOfView,
      this.aspect,
      this.zNear,
      this.zFar
    );
  }

  translate(v: vec3) {
    mat4.translate(this.modelViewMatrix, this.modelViewMatrix, v);
  }

  moveTo(v: vec3) {
    mat4.identity(this.modelViewMatrix);
    this.translate(v);
  }
}
