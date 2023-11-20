import { Camera } from '$lib/engine';
import Renderer from '$lib/engine/components/renderer/renderer';
import ScriptBehaviour from '$lib/engine/components/script-behaviour';
import Time from '$lib/engine/time';
import CameraScript from './camera-script';
import CubeScript from './cube-script';

export default class CubeRootScript extends ScriptBehaviour {
  prevStepTime = 0;

  public update(): void {
    if (this.prevStepTime === 0) {
      this.prevStepTime = Time.time;
      return;
    }

    if (Time.time - this.prevStepTime < 5.0) {
      return;
    }

    this.prevStepTime = Time.time;

    const invisibleChildren = this.baseObject
      .getComponentsInChildren(Renderer)
      .filter((child) => !child.enabled)
      .sort((a, b) => b.transform.position[2] - a.transform.position[2]);

    if (invisibleChildren.length > 0) {
      invisibleChildren[0].enabled = true;

      if (invisibleChildren.length === 1) {
        this.baseObject.getComponentsInChildren(CubeScript).forEach((cs) => cs.enable());

        Camera.main?.getComponent(CameraScript)?.enable();
        this.disable();
      }
    }
  }
}
