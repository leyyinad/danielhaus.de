<script lang="ts">
  import { onMount } from 'svelte';
  import { quartOut } from 'svelte/easing';
  import TreeRenderer from './TreeRenderer';

  interface Props {
    delay?: number;
  }

  let { delay = 20 }: Props = $props();

  let canvas: HTMLCanvasElement;
  let prevTick = 0;
  let totalTime = 0;
  let opacity = $state(0);
  let running = false;

  let clientWidth: number = $state(0);

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

<style>
  div,
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
</style>
