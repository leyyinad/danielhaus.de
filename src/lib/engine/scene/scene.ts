import Engine from '../engine';

export default class Scene {
  constructor(public name = 'Scene') {}

  getRootObjects() {
    return Engine.currentContext?.objects.filter(
      (o) => o.scene === this && o.transform.parent == null
    );
  }
}
