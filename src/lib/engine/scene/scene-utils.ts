import { quat, vec3, type ReadonlyVec3 } from 'gl-matrix';
import type Component from '../components/component';
import BaseObject from '../object';
import type Scene from './scene';

export type ComponentConstructor<T extends Component> = new () => T;

export type ComponentSpecWithConfig<T extends Component> = [
  ComponentConstructor<T>,
  { [key: string]: unknown }
];

export type ComponentSpec<T extends Component> =
  ComponentConstructor<T> | ComponentSpecWithConfig<T>;

export type BaseObjectSpec = {
  name?: string;
  scene: Scene;
  components: ComponentSpec<Component>[];
  position?: ReadonlyVec3;
  rotation?: ReadonlyVec3;
  scale?: ReadonlyVec3 | number;
  parent?: BaseObject;
};

export const createObject = (spec: BaseObjectSpec) => {
  const obj = new BaseObject();

  obj.scene = spec.scene;
  obj.name = spec.name ?? 'Base Object';

  spec.components?.forEach((c) => {
    let constr: ComponentConstructor<Component>;
    let config: { [index: string]: unknown };

    if (c.constructor == Array) {
      constr = c[0];
      config = c[1];
    } else {
      constr = c as unknown as ComponentConstructor<Component>;
      config = {};
    }

    const comp = new constr() as unknown as { [index: string]: unknown };

    Object.entries(config).forEach(([k, v]) => {
      comp[k] = v as unknown;
    });

    obj.addComponent(comp as unknown as Component);

    if (spec.position != null) {
      obj.transform.position = vec3.clone(spec.position);
    }

    if (spec.rotation != null) {
      const q = quat.create();
      quat.fromEuler(q, ...(spec.rotation as [number, number, number]));
      obj.transform.rotation = quat.clone(q);
    }

    const isNumber = (x: unknown): x is number => {
      return x instanceof Number;
    };

    if (spec.scale != null) {
      if (isNumber(spec.scale)) {
        obj.transform.scale = [spec.scale, spec.scale, spec.scale];
      } else {
        obj.transform.scale = spec.scale as [number, number, number];
      }
    }
  });

  if (spec.parent != null) {
    obj.transform.parent = spec.parent.transform;
  }

  return obj;
};
