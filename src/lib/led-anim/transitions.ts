import type { LedAnimComponentConfig, LedAnimGeneratorComponent } from './types';

export const fade =
  (a: LedAnimGeneratorComponent, b: LedAnimGeneratorComponent) =>
  (x: number, y: number, config: LedAnimComponentConfig) => {
    const { t } = config;

    if (t <= 0.0) {
      return a(x, y, config);
    } else if (t >= 1.0) {
      return b(x, y, config);
    } else {
      return (1 - t) * a(x, y, config) + t * b(x, y, config);
    }
  };
