<script lang="ts">
  import City from '$lib/city/index';
  import { onDestroy, onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let visible = true;
  let observer: IntersectionObserver;

  if (typeof window != 'undefined' && typeof document != 'undefined') {
    let city: City | undefined;

    const init = () => {
      if (canvas != null && canvas instanceof HTMLCanvasElement) {
        city = new City(canvas);

        window.addEventListener('resize', resize);
        window.requestAnimationFrame((t) => city!.engine.loop(t));
        city.engine.visible = visible;

        resize();

        observer = new IntersectionObserver(updateVisibility);
        observer.observe(canvas);
      }
    };

    const resize = () => city?.engine.resize();

    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      city = undefined;
    };

    const updateVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => (visible = entry.intersectionRatio > 0));
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
