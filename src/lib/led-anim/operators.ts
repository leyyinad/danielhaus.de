import type { LedAnimComponentConfig, LedAnimGeneratorComponent } from "./types";
import { OFF, ON } from "./utils";

export const add = (
  ...components: LedAnimGeneratorComponent[]
): LedAnimGeneratorComponent => (x, y, config) => {
  let value = OFF;

  components.every(component => {
    value += component(x, y, config);
    return value < ON;
  });

  return value;
};

export const subtract = (
  a: LedAnimGeneratorComponent,
  b: LedAnimGeneratorComponent,
): LedAnimGeneratorComponent => (x, y, config) =>
    a(x, y, config) - b(x, y, config);

export const multiply = (
  ...components: LedAnimGeneratorComponent[]
): LedAnimGeneratorComponent => (x, y, config) =>
    components.map(component => component(x, y, config)).reduce((val, acc) => acc *= val);

export const mix = (
  ...components: LedAnimGeneratorComponent[]
): LedAnimGeneratorComponent => (x, y, config) =>
    components
      .map(component => component(x, y, config))
      .reduce((val, acc) => val + acc)
    / components.length;

export const sequence = (
  ...sequence: [LedAnimGeneratorComponent, number][]
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    let { t, start } = config;

    const item = sequence.find(([_c, duration]) => {
      if (t < duration) {
        return true;
      }

      t -= duration;
      start += duration;
    });

    if (item) {
      const component = item[0];
      return component(x, y, { ...config, t, start });
    } else {
      return OFF;
    }
  };

export const timeline = (
  ...timeline: [LedAnimGeneratorComponent, number, number][]
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const { t } = config;
    let c = OFF;
    timeline.forEach(([component, start, end]) => {
      if (t >= start && t <= end) {
        c += component(x, y, { ...config, t: t - start });
      }
    });
    return c;
  };

export const loop = (
  component: LedAnimGeneratorComponent,
  duration: number,
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => component(x, y, { ...config, t: config.t % duration });
