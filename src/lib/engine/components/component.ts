import type { ComponentConstructor } from "../object";
import type BaseObject from "../object";
import type Transform from "./transform";

export default class Component {
  public baseObject!: BaseObject;

  get transform(): Transform {
    return this.baseObject.transform;
  }

  get tags(): string[] {
    return this.baseObject.tags;
  }

  getComponent<T extends Component>(type: ComponentConstructor<T>): T | undefined {
    return this.baseObject.getComponent(type);
  }
}
