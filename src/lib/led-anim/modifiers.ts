import type { LedAnimAnimatableValue, LedAnimComponentConfig, LedAnimGeneratorComponent } from "./types";
import { OFF, ON, animate } from "./utils";

export const speed = (
  component: LedAnimGeneratorComponent,
  speed: number
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => component(x, y, { ...config, t: config.t * speed });

export const delay = (
  component: LedAnimGeneratorComponent,
  t = 1
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => component(x, y, { ...config, t: config.t - t });

export const dim = (
  component: LedAnimGeneratorComponent,
  amount = 0.5
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => amount * component(x, y, config);

export const fadeIn = (
  component: LedAnimGeneratorComponent,
  duration = 1.0
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    let c = component(x, y, config);
    if (config.t < duration) {
      c *= config.t / duration;
    }
    return c;
  };

export const fadeOut = (
  component: LedAnimGeneratorComponent,
  duration = 1.0
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    let c = component(x, y, config);
    if (config.t < duration) {
      c *= ON - (config.t / duration);
    }
    return c;
  };

export type LedAnimReverbConfig = {
  size: number;
  mix: number;
};

export const reverbDefaults: LedAnimReverbConfig = {
  size: 7,
  mix: 0.5,
};

export const reverb = (
  component: LedAnimGeneratorComponent,
  reverbConfig?: LedAnimReverbConfig,
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const { size, mix } = { ...reverbDefaults, ...reverbConfig };

    let c = OFF;
    const d = mix / size;

    for (let i = 0; i < size; i++) {
      const f = (d * i);
      if (f > 0.01) {
        c += f * component(x, y, { ...config, t: config.t + i });
      }
    }

    return c;
  };

export type LedAnimTranslateConfig = {
  x?: LedAnimAnimatableValue;
  y?: LedAnimAnimatableValue;
  rotate?: boolean;
};

export const translateDefaults: LedAnimTranslateConfig = {
  x: 0,
  y: 0,
  rotate: false,
};

export const translate = (
  component: LedAnimGeneratorComponent,
  translateConfig?: LedAnimTranslateConfig
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const cfg = animate(translateDefaults, translateConfig, config,
      ['x', 'y']);

    x = x - cfg.x!;
    y = y - cfg.y!;
    if (cfg.rotate) {
      x %= config.width;
      y %= config.height;
    }

    x = Math.round(x);
    y = Math.round(y);

    return component(x, y, config);
  };

export type LedAnimScaleConfig = {
  sx: LedAnimAnimatableValue;
  sy?: LedAnimAnimatableValue;
  cx?: LedAnimAnimatableValue;
  cy?: LedAnimAnimatableValue;
};


export const scaleDefaults: LedAnimScaleConfig = {
  sx: 1.0,
  cx: (t, config) => config.width * 0.5,
  cy: (t, config) => config.height * 0.5,
};

export const scale = (
  component: LedAnimGeneratorComponent,
  scaleConfig?: LedAnimScaleConfig
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const cfg = animate(
      scaleDefaults, scaleConfig, config,
      ['sx', 'sy', 'cx', 'cy']);

    const { sx, cx, cy } = cfg;
    let { sy } = cfg;

    if (sy == null) {
      sy = sx;
    }

    return component(
      Math.round((x - cx!) / sx + cx!),
      Math.round((y - cy!) / sy + cy!),
      config
    );
  };

export type LedAnimRotateConfig = {
  radians: LedAnimAnimatableValue;
  cx?: LedAnimAnimatableValue;
  cy?: LedAnimAnimatableValue;
};

export const rotateDefaults: LedAnimRotateConfig = {
  radians: 0.0,
};

export const rotate = (
  component: LedAnimGeneratorComponent,
  rotateConfig?: LedAnimRotateConfig
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const { radians, cx, cy } = animate(
      rotateDefaults, rotateConfig, config,
      ['radians', 'cx', 'cy']
    );

    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    x = x - cx!;
    y = y - cy!;

    return component(
      Math.round(x * cos - y * sin + cx!),
      Math.round(x * sin + y * cos + cy!),
      config
    );
  };

export const time = (
  component: LedAnimGeneratorComponent,
  offset: number,
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => component(x, y, { ...config, t: config.t + offset });

export type LedAnimVignetteConfig = {
  size: LedAnimAnimatableValue;
};

export const vignetteDefaults: LedAnimVignetteConfig = {
  size: 1.0 / 8.0,
};

export const vignette = (
  component: LedAnimGeneratorComponent,
  vignetteConfig?: LedAnimVignetteConfig,
) => (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => {
    const { size } = animate(vignetteDefaults, vignetteConfig, config, ['size']);
    const { width, height } = config;

    const cx = size * width;
    const cy = size * height;

    const dx = x / width;
    const dy = y / height;

    let v = ON;

    if (dx < size) {
      v *= x / cx;
    } else if (dx >= 1 - size) {
      v *= (width - x - 1) / cx;
    }

    if (dy < size) {
      v *= y / cy;
    } else if (dy >= 1 - size) {
      v *= (height - y - 1) / cy;
    }

    return v * component(x, y, config);
  };
