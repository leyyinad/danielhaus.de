<script lang="ts">
  import { onMount } from 'svelte';
  import { quartOut } from 'svelte/easing';
  import TreeRenderer from './TreeRenderer';

  export let delay = 20;

  let canvas: HTMLCanvasElement;
  let prevTick = 0;
  let totalTime = 0;
  let opacity = 0;
  let running = false;

  let clientWidth: number;

  export function start() {
    running = true;

    requestAnimationFrame((t: number) => {
      if (prevTick == 0) {
        prevTick = t;
      }

      loop(t);
    });
  }

  export function pause() {
    running = false;
  }

  let renderer: TreeRenderer;

  const tick = (t: number) => {
    const delta = t - prevTick;
    totalTime += delta;

    renderer.resize();

    const fadeIn = quartOut(Math.min((totalTime * 0.005) / 37, 1.0));

    opacity = fadeIn;
    const angle = Math.min(37, fadeIn * 37);
    const depth = 13;

    const angleAnim = 2.5 * Math.sin(totalTime * 0.00025);

    let x;
    if (clientWidth < 1024) {
      x = 0.75 * clientWidth;
    } else {
      x = (clientWidth - 1024) * 0.5 + 1024 * 0.85;
    }

    renderer.render(x, angle + angleAnim, depth);
    prevTick = t;
  };

  const loop = (t: number) => {
    if (!running) return;
    tick(t);
    setTimeout(() => requestAnimationFrame(loop), delay);
  };

  const init = () => {
    const context = canvas?.getContext('2d');

    if (context) {
      renderer = new TreeRenderer(canvas, context);
    }
  };

  onMount(init);
</script>

<div bind:clientWidth>
  <canvas bind:this={canvas} style={`opacity: ${opacity}`}></canvas>
</div>

<style lang="postcss">
  div,
  canvas {
    @apply absolute
      right-0
      top-0
      h-full
      w-full;
  }
</style>
