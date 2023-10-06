import { vec3 } from "gl-matrix";
import ScriptBehaviour from "../components/script-behaviour";
import Time from "../time";

export default class CameraScript extends ScriptBehaviour {
  public update(): void {
    // const t = (Time.time * 0.001) % 2.0;

    // this.transform.position = vec3.fromValues(
    //   -0.5, -2.75, -12.0 + t);
  }
}
