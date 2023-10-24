import ScriptBehaviour from "$lib/engine/components/script-behaviour";
import Time from "$lib/engine/time";

export default class CubeScript extends ScriptBehaviour {
  enabled = false;
  offset = 0;

  public update(): void {
    if (this.offset === 0) {
      this.offset = Time.time;
      return;
    }

    const { transform } = this;

    const t = ((Time.time - this.offset) * 0.001) % 1000000.0;
    const camPos = -12.0 + t * 0.5;

    if (transform.position[2] > -camPos) {
      transform.translate(0.0, 0.0, -16.0);
    }
  }
}
