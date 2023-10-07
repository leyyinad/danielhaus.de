import { mat4 } from 'gl-matrix';
import Camera from './components/camera/camera';
import ScriptBehaviour from './components/script-behaviour';
import type Renderer from './drivers/renderer';
import BaseObject from './object';
import type Scene from './scene/scene';
import Time from './time';

export default class Engine {
  scene!: Scene;
  modelView: mat4;
  throttle: number = 0;

  constructor(public renderer: Renderer) {
    renderer.engine = this;
    this.modelView = mat4.create();
  }

  init() {
    this.renderer.init();
  }

  viewport(x: number, y: number, width: number, height: number) {
    Camera.main!.aspect = width / Math.max(height, 1);
    this.renderer.viewport(x, y, width, height);
  }

  loop(time: DOMHighResTimeStamp) {
    this.update(time);
    this.render();
    this.renderer.loop((time: DOMHighResTimeStamp) => this.loop(time));
  }

  resize() {
    this.renderer.resize();
  }

  update(time: number) {
    Time.timeDelta = time - Time.time;
    Time.time = time;
    Time.frameCount++;

    for (const o of BaseObject.objects) {
      for (const c of o.getComponents(ScriptBehaviour)) {
        if (c.enabled) {
          c.update();
        }
      }
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.render();
  }
}
