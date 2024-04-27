import Engine from './engine';

export default class Time {
  /*  time since start in ms */
  time = 0;

  /* time since last frame in ms */
  timeDelta = 0;

  /* number of frames since start */
  frameCount = 0;

  static get time() {
    return Engine.currentContext?.time.time ?? 0;
  }

  static get timeDelta() {
    return Engine.currentContext?.time.timeDelta ?? 0;
  }

  static get frameCount() {
    return Engine.currentContext?.time.frameCount ?? 0;
  }
}
