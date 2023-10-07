import ScriptBehaviour from "../../engine/components/script-behaviour";
import Time from "../../engine/time";

export default class CameraScript extends ScriptBehaviour {
  public update(): void {
    const t = (Time.time * 0.001) % 1000000.0;
    const [x, y] = this.transform.position;
    this.transform.position = [x, y, -12.0 + t * 0.5];
  }
}
