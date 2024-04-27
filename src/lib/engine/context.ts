import type Camera from './components/camera/camera';
import type Engine from './engine';
import type BaseObject from './object';
import Time from './time';

export default class EngineContext {
  objects: BaseObject[] = [];
  time: Time = new Time();
  camera: Camera | undefined;

  constructor(public readonly engine: Engine) {}
}
