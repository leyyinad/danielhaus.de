<script lang="ts">
  import { browser } from '$app/environment';
  import { zero } from '$lib/led-anim';
  import type { LedAnimComponentConfig, LedAnimGeneratorComponent } from '$lib/led-anim/types';
  import { OFF, ON } from '$lib/led-anim/utils';
  import { onDestroy, onMount } from 'svelte';

  export let width = 8;
  export let height = 8;
  export let gap = 2.0;
  export let pw = 8.0;
  export let ph = 8.0;
  export let delay = 10;

  export let fn: LedAnimGeneratorComponent = zero;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  let count = width * height;
  let resX = width * pw + (width - 1) * gap;
  let resY = height * ph + (height - 1) * gap;
  let offset = 0;

  let running = false;

  export function start() {
    running = true;
    requestAnimationFrame(loop);
  }

  export function pause() {
    running = false;
  }

  const init = (canvas: HTMLCanvasElement) => {
    context = canvas.getContext('2d')!;

    canvas.width = resX;
    canvas.height = resY;

    running = true;

    requestAnimationFrame(loop);
  };

  const tick = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const mx = Array(count);
    const config: LedAnimComponentConfig = {
      width,
      height,
      time: time - offset,
      t: time * 0.001,
      i: 0,
      start: 0
    };

    for (let i = 0; i < count; i++) {
      const x = i % width;
      const y = Math.floor(i / width);

      const c = fn(x, y, { ...config, i });
      if (c >= ON) {
        mx[i] = ON;
      } else if (c <= 0.0) {
        mx[i] = OFF;
      } else {
        mx[i] = c;
      }
    }

    mx.forEach((c, i) => {
      context.fillStyle = `rgba(255 255 255 / ${c})`;

      const x = i % width;
      const y = Math.floor(i / width);

      context.beginPath();
      context.roundRect((pw + gap) * x, (ph + gap) * y, pw, ph, 3);
      context.fill();
    });
  };

  const loop = (time: number) => {
    if (!running) return;

    tick(time);

    setTimeout(() => {
      requestAnimationFrame(loop);
    }, delay);
  };

  if (browser) {
    onMount(() => {
      init(canvas);
    });

    onDestroy(() => {
      running = false;
    });
  }
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
</style>
