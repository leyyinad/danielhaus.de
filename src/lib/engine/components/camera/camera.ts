import Engine from '$lib/engine/engine';
import { mat4 } from 'gl-matrix';
import Behaviour from '../behaviour';

export default class Camera extends Behaviour {
  public fieldOfView = (45 * Math.PI) / 180;
  public zNear = 0.1;
  public zFar = 100.0;
  public aspect = 1.0;

  private _projection: mat4 = mat4.create();

  static get main(): Camera | undefined {
    return Engine.currentContext?.camera;
  }

  constructor() {
    super();

    if (Camera.main == null) {
      this.use();
    }
  }

  public use() {
    if (Engine.currentContext != null) {
      Engine.currentContext.camera = this;
    }
  }

  public get projection() {
    this.update();
    return this._projection;
  }

  private update() {
    mat4.perspective(this._projection, this.fieldOfView, this.aspect, this.zNear, this.zFar);
  }
}
