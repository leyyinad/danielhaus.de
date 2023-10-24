import ScriptBehaviour from "../../engine/components/script-behaviour";
import Time from "../../engine/time";

export default class CameraScript extends ScriptBehaviour {
  enabled = true;
  offset = 0;
  zOffset = -12.0;

  public start(): void {
    const [x, y] = this.transform.position;
    this.transform.position = [x, y, this.zOffset];
    this.disable();
  }

  public update(): void {
    const t = ((Time.time - this.offset) * 0.001);
    const [x, y] = this.transform.position;
    this.transform.position = [x, y, this.zOffset + t * 0.5];
  }

  public enable(): void {
    this.offset = Time.time;
    super.enable();
  }
}
