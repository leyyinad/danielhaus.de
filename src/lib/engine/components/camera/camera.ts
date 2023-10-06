import { mat4 } from "gl-matrix";
import Behaviour from "../behaviour";

export default class Camera extends Behaviour {
  static main: Camera | undefined;

  public fieldOfView = (45 * Math.PI) / 180;
  public zNear = 0.1;
  public zFar = 100.0;
  public aspect = 1.0;

  private _projection: mat4 = mat4.create();

  constructor() {
    super();

    if (Camera.main == null) {
      Camera.main = this;
    }
  }

  public get projection() {
    this.update();
    return this._projection;
  }

  private update() {
    mat4.perspective(
      this._projection,
      this.fieldOfView, this.aspect, this.zNear, this.zFar);
  }
}
