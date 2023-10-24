import type Component from "./components/component";
import type Scene from "./scene/scene";
import Transform from "./components/transform";

export type ComponentConstructor<T extends Component> = (new () => T);

// const components: Component[] = [];

// (new (...args: ConstructorParameters<T>) => T);
// type Constructor<T> = (new () => T);

// const getComponent = <T extends Component>(type: Constructor<T>): T | undefined => {
//   return components.find(c => c instanceof type) as T;
// };

// const e = getComponent(Environment);



export default class BaseObject {
  static objects: BaseObject[] = [];

  name: string;
  components: Component[];
  tags: string[];
  scene: Scene | undefined = undefined;
  transform!: Transform;
  active = true;

  constructor() {
    this.name = this.constructor.name;
    this.transform = new Transform();
    this.components = [this.transform];
    this.tags = [];

    BaseObject.objects.push(this);
  }

  get children() {
    return BaseObject.objects.filter(o => o.transform.parent === this.transform);
  }

  static find(name: string) {
    this.objects.find(o => o.name === name);
  }

  addComponent(component: Component) {
    component.baseObject = this;
    this.components.push(component);
  }

  addComponents(...components: Component[]) {
    components.forEach(component => this.addComponent(component));
  }

  getComponent<T extends Component>(type: ComponentConstructor<T>): T | undefined {
    return this.components.find(c => c instanceof type) as T;
  }

  getComponents<T extends Component>(type: ComponentConstructor<T>): T[] {
    return this.components.filter(c => c instanceof type) as T[];
  }

  getComponentsInChildren<T extends Component>(type: ComponentConstructor<T>): T[] {
    return this.getComponents(type)
      .concat(
        this.children.map(child => child
          .getComponentsInChildren(type))
          .reduce((acc, val) => [...acc, ...val], [])
      );
  }
}
