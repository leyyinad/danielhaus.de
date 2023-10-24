import ScriptBehaviour from "$lib/engine/components/script-behaviour";
import Time from "$lib/engine/time";

export default class CubeScript extends ScriptBehaviour {
  enabled = false;

  public update(): void {
    const { transform } = this;

    const t = (Time.time * 0.001) % 1000000.0;
    const camPos = -12.0 + t * 0.5;

    if (transform.position[2] > -camPos) {
      transform.translate(0.0, 0.0, -16.0);
    }
  }
}
