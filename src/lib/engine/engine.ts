import { mat4 } from 'gl-matrix';
import Camera from './components/camera/camera';
import ScriptBehaviour from './components/script-behaviour';
import EngineContext from './context';
import type RenderDriver from './drivers/render-driver';
import type Scene from './scene/scene';
import Time from './time';

export default class Engine {
  scene!: Scene;
  modelView: mat4;
  throttle: number = 0;
  running: boolean = false;
  context: EngineContext;

  static currentContext: EngineContext | undefined;

  constructor(public renderDriver: RenderDriver) {
    this.modelView = mat4.create();

    this.context = new EngineContext(this);
    renderDriver.engineContext = this.context;

    if (Engine.currentContext == null) {
      this.use();
    }
  }

  use() {
    Engine.currentContext = this.context;
  }

  init() {
    this.renderDriver.init();
  }

  viewport(x: number, y: number, width: number, height: number) {
    Camera.main!.aspect = width / Math.max(height, 1);
    this.renderDriver.viewport(x, y, width, height);
  }

  tick(time: DOMHighResTimeStamp) {
    this.update(time);
    this.render();
  }

  run() {
    this.running = true;
    this.renderDriver.run((time: DOMHighResTimeStamp) => this.loop(time));
  }

  stop() {
    this.running = false;
  }

  loop(time: DOMHighResTimeStamp) {
    this.tick(time);
    if (this.running) {
      this.renderDriver.loop((time: DOMHighResTimeStamp) => this.loop(time));
    }
  }

  resize() {
    this.renderDriver.resize();
  }

  update(time: number) {
    const contextTime = this.context.time;
    contextTime.timeDelta = time - Time.time;
    contextTime.time = time;
    contextTime.frameCount++;

    for (const o of this.context.objects) {
      for (const c of o.getComponents(ScriptBehaviour)) {
        if (c.enabled) {
          if (!c._started) {
            c.start();
            c._started = true;

            if (!c.enabled) continue;
          }

          c.update();
        }
      }
    }
  }

  render() {
    this.renderDriver.clear();
    this.renderDriver.render();
  }
}
