import { mat4, quat, vec3, type ReadonlyMat4, type ReadonlyQuat, type ReadonlyVec3 } from "gl-matrix";
import Component from "./component";

export const PI_BY_180 = Math.PI / 180.0;

export default class Transform extends Component {
  private _position: vec3;
  private _localPosition: vec3;
  private _rotation: quat;
  private _scale: vec3;
  private _matrix: mat4;
  private _dirty: boolean;
  public parent?: Transform;

  constructor() {
    super();

    this._position = vec3.create();
    this._localPosition = vec3.create();
    this._rotation = quat.create();
    this._scale = vec3.fromValues(1.0, 1.0, 1.0);

    this._matrix = mat4.create();
    this._dirty = true;
  }

  protected update() {
    mat4.fromRotationTranslationScale(
      this._matrix, this._rotation, this._position, this._scale);
  }

  get matrix(): ReadonlyMat4 {
    if (this._dirty) {
      this.update();
      this._dirty = false;
    }

    return this._matrix;
  }

  set matrix(m: ReadonlyMat4) {
    if (mat4.equals(this._matrix, m)) {
      return;
    }

    mat4.copy(this._matrix, m);

    mat4.getTranslation(this._position, this._matrix);
    this.position = this._position;

    mat4.getRotation(this._rotation, this._matrix);
    mat4.getScaling(this._scale, this._matrix);
  }

  get position(): ReadonlyVec3 {
    return this._position;
  }

  set position(v: vec3) {
    if (vec3.equals(this._position, v)) {
      return;
    }

    this._position = vec3.clone(v);

    if (this.parent == null) {
      vec3.copy(this._localPosition, this._position);
    } else {
      vec3.sub(this._localPosition, v, this.parent._position);
    }

    this._dirty = true;
  }

  get localPosition(): ReadonlyVec3 {
    return this._localPosition;
  }

  set localPosition(v: vec3) {
    if (vec3.equals(this._localPosition, v)) {
      return;
    }

    this._localPosition = vec3.clone(v);

    if (this.parent == null) {
      vec3.copy(this._position, this._localPosition);
    } else {
      vec3.add(this._position, this.parent._position, v);
    }

    this._dirty = true;
  }

  get rotation(): ReadonlyQuat {
    return this._rotation;
  }

  set rotation(q: quat) {
    if (quat.equals(this._rotation, q)) {
      return;
    }

    this._rotation = quat.clone(q);

    this._dirty = true;
  }

  get scale(): ReadonlyVec3 {
    return this._scale;
  }

  set scale(s: vec3) {
    if (vec3.equals(this._scale, s)) {
      return;
    }

    this._scale = vec3.clone(s);

    this._dirty = true;
  }

  public translate(x: number, y: number, z: number) {
    const pos = vec3.fromValues(x, y, z);
    vec3.add(pos, this.position, pos);
    this.position = pos;
  }

  public rotateX(degrees: number) {
    if (degrees === 0.0) {
      return;
    }

    quat.rotateX(this._rotation, this._rotation, degrees * PI_BY_180);

    this._dirty = true;
  }
  public rotateY(degrees: number) {
    if (degrees === 0.0) {
      return;
    }

    quat.rotateY(this._rotation, this._rotation, degrees * PI_BY_180);

    this._dirty = true;
  }
  public rotateZ(degrees: number) {
    if (degrees === 0.0) {
      return;
    }

    quat.rotateZ(this._rotation, this._rotation, degrees * PI_BY_180);

    this._dirty = true;
  }

  public lookAt(p: ReadonlyVec3) {
    const m = mat4.create();

    mat4.lookAt(m, this._position, p, vec3.fromValues(0.0, 1.0, 0.0));

    this.matrix = m;
  }
}
