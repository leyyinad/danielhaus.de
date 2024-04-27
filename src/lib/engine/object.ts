import type Component from './components/component';
import Transform from './components/transform';
import Engine from './engine';
import type Scene from './scene/scene';

export type ComponentConstructor<T extends Component> = new () => T;

export default class BaseObject {
  name: string;
  components: Component[];
  tags: string[];
  scene: Scene | undefined = undefined;
  transform!: Transform;
  active = true;

  constructor() {
    if (Engine.currentContext == null) {
      throw new Error('No active engine.');
    }

    this.name = this.constructor.name;
    this.transform = new Transform();
    this.components = [this.transform];
    this.tags = [];

    Engine.currentContext!.objects.push(this);
  }

  get children() {
    return Engine.currentContext!.objects.filter((o) => o.transform.parent === this.transform);
  }

  static find(name: string) {
    return Engine.currentContext!.objects.find((o) => o.name === name);
  }

  addComponent(component: Component) {
    component.baseObject = this;
    this.components.push(component);
  }

  addComponents(...components: Component[]) {
    components.forEach((component) => this.addComponent(component));
  }

  getComponent<T extends Component>(type: ComponentConstructor<T>): T | undefined {
    return this.components.find((c) => c instanceof type) as T;
  }

  getComponents<T extends Component>(type: ComponentConstructor<T>): T[] {
    return this.components.filter((c) => c instanceof type) as T[];
  }

  getComponentsInChildren<T extends Component>(type: ComponentConstructor<T>): T[] {
    return this.getComponents(type).concat(
      this.children
        .map((child) => child.getComponentsInChildren(type))
        .reduce((acc, val) => [...acc, ...val], [])
    );
  }
}
