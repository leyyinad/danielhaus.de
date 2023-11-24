<script lang="ts">
  import City from '$lib/city/index';
  import { onDestroy, onMount } from 'svelte';

  export let active = true;

  let canvas: HTMLCanvasElement;
  let city: City | undefined;

  $: if (city?.engine != null) city.engine.active = active;

  if (typeof window != 'undefined' && typeof document != 'undefined') {
    const init = () => {
      if (canvas != null && canvas instanceof HTMLCanvasElement) {
        city = new City(canvas);

        if (city?.engine != null) {
          window.addEventListener('resize', resize);
          window.requestAnimationFrame((t) => city?.engine?.loop(t));
          city.engine.active = active;

          resize();
        }
      }
    };

    const resize = () => city?.engine?.resize();

    const cleanup = () => {
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
