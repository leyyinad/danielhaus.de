import type { LedAnimComponentConfig, LedAnimGeneratorComponent } from './types';
import { OFF, ON, toggle } from './utils';

export const zero: LedAnimGeneratorComponent = () => OFF;

export const one: LedAnimGeneratorComponent = () => ON;
export const random: LedAnimGeneratorComponent = () => Math.random();

export const rect =
  (x0: number, y0: number, w: number, h: number): LedAnimGeneratorComponent =>
  (x: number, y: number, { width, height }: LedAnimComponentConfig) => {
    const x_rel = x / width;
    const y_rel = y / height;

    return x_rel >= x0 && x_rel < x0 + w && y_rel >= y0 && y_rel < y0 + h ? ON : OFF;
  };

export const blink: LedAnimGeneratorComponent = (
  x: number,
  y: number,
  { t }: LedAnimComponentConfig
) => (Math.floor(t % 2.0) === 0 ? ON : OFF);

export const blinkEveryOther: LedAnimGeneratorComponent = (
  x: number,
  y: number,
  { t }: LedAnimComponentConfig
) => {
  const light = Math.floor(t % 2.0) === 0 ? ON : OFF;
  const dark = toggle(light);

  return x % 2 !== y % 2 ? light : dark;
};

export const ledTest = (x: number, y: number, { t, width }: LedAnimComponentConfig) =>
  Math.floor(t % width) === x || Math.floor(t % width) === y ? ON : OFF;

export const lonelyRunner = (
  x: number,
  y: number,
  { t, i, width, height }: LedAnimComponentConfig
) => (i == Math.floor(t) % (width * height) ? ON : OFF);

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    if (typeof Image !== 'undefined') {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    } else {
      reject(new Error('Server rendering not supported'));
    }
  });

export type LedAnimImageConfig = {
  width: number;
  height: number;
};

export const imageDefaults: LedAnimImageConfig = {
  width: 0,
  height: 0
};

export const image = (src: string, imageConfig?: LedAnimImageConfig): LedAnimGeneratorComponent => {
  let { width, height } = { ...imageDefaults, ...imageConfig };
  let data: number[] = [];

  loadImage(src)
    .then((img: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = width > 0 ? width : img.width;
      canvas.height = height > 0 ? height : img.height;

      [width, height] = [canvas.width, canvas.height];

      const context = canvas.getContext('2d')!;
      context.drawImage(img, 0, 0, width, height);
      const n = canvas.width * canvas.height;
      data = new Array(n);
      const d = context.getImageData(0, 0, width, height).data;

      for (let i = 0; i < n; i++) {
        data[i] = d[i * 4];
      }
    })
    .catch(() => {});

  return (x: number, y: number, { width, height }: LedAnimComponentConfig) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      return data[x + y * width] / 255 || OFF;
    } else {
      return OFF;
    }
  };
};

export const plasma: LedAnimGeneratorComponent = (
  x: number,
  y: number,
  { t, start }: LedAnimComponentConfig
) => {
  t += start;
  let v = OFF;

  x *= 0.025;
  y *= 0.025;

  v += Math.sin(x * 10 + t);

  v += Math.sin(10 * (x * Math.sin(t / 2) + y * Math.cos(t / 3)) + t);

  const cx = x + 0.5 * Math.sin(t / 5.0);
  const cy = y + 0.5 * Math.cos(t / 3.0);
  v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1) + t);

  const c = 0.5 * (Math.sin(t) + 1.25) * 1.1;

  return Math.sin(v * c * Math.PI);
};
