<script lang="ts">
  import { onMount } from 'svelte';
  import { quartOut } from 'svelte/easing';

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

  class TreeRenderer {
    public center = 160;
    protected width = 320;
    protected height = 200;
    public size = 48;

    constructor(
      protected readonly canvas: HTMLCanvasElement,
      protected readonly context: CanvasRenderingContext2D
    ) {
      this.resize();
    }

    render(x: number, angle: number, depth: number) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.lineWidth = 1;
      this.context.strokeStyle = 'white';
      this.context.fillStyle = '#00c33d';

      const s = this.size;
      const y = -0.5 * s;

      const ctx = this.context;

      ctx.translate(x, y + this.canvas.height);
      ctx.scale(1.75, -1.75);
      this.renderTree(angle, depth);
    }

    getBranchColor(depth: number) {
      const r = 16 + 4 * depth;
      const g = 195 - 16 * depth;
      const b = 61 - 3 * depth;

      return `rgb(${r} ${g} ${b})`;
    }

    renderTree(angle: number, depth: number) {
      const ctx = this.context;

      this.context.fillStyle = this.getBranchColor(depth);
      this.renderSquare();

      if (depth > 1) {
        // left subtree
        ctx.translate(0, this.size);
        ctx.save();

        const rad = (angle * Math.PI) / 180;

        ctx.rotate(rad);

        const sf = Math.cos(rad);
        ctx.scale(sf, sf);

        this.renderTree(angle, depth - 1);

        ctx.restore();

        // right subtree
        ctx.save();
        ctx.translate(this.size, 0);

        const rad2 = ((-90 - angle) * Math.PI) / 180;
        ctx.rotate(-rad2);

        const sf2 = Math.cos(rad2);
        ctx.scale(sf2, sf2);
        ctx.translate(-this.size, 0);

        this.renderTree(angle, depth - 1);

        ctx.restore();
      }
    }

    renderSquare() {
      const s = this.size;

      const w = 0.2 * s;
      const h0 = s * 1.05;
      const h1 = s * -0.5;

      this.context.beginPath();
      this.context.moveTo(s * 0.5 - w, h1);
      this.context.lineTo(s * 0.5 - w, h0);
      this.context.lineTo(s * 0.5, h0 * 1.1);
      this.context.lineTo(s * 0.5 + w, h0);
      this.context.lineTo(s * 0.5 + w, h1);
      this.context.closePath();

      this.context.fill();
    }

    resize() {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  }

  onMount(init);
</script>

<div bind:clientWidth>
  <canvas bind:this={canvas} style={`opacity: ${opacity}`}></canvas>
</div>

<style lang="postcss">
  div,
  canvas {
    @apply absolute right-0 top-0 h-full w-full;
  }
</style>
