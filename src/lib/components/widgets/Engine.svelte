<script lang="ts">
  import City from '$lib/city/index';
  import { onDestroy, onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let city: City | undefined;

  let running = false;

  export function start() {
    running = true;

    const loop = (t: number) => {
      if (!running) return;
      city!.engine!.tick(t);
      window.requestAnimationFrame((t) => loop(t));
    };

    window.requestAnimationFrame(loop);
  }

  export function pause() {
    running = false;
  }

  if (typeof window != 'undefined' && typeof document != 'undefined') {
    const init = () => {
      if (canvas != null && canvas instanceof HTMLCanvasElement) {
        city = new City(canvas);

        if (city?.engine != null) {
          window.addEventListener('resize', resize);
          resize();
        }
      }
    };

    const resize = () => city?.engine?.resize();

    const cleanup = () => {
      pause();
      window.removeEventListener('resize', resize);
      city = undefined;
    };

    onMount(init);
    onDestroy(cleanup);
  }
</script>

<canvas id="canvas" bind:this={canvas}></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
