<script lang="ts">
  import cityGrid from '$lib/city/city-grid';
  import Cube from '$lib/city/models/cube';
  import { Engine } from '$lib/engine';
  import WebGLRenderDriver from '$lib/engine/drivers/webgl/webgl-render-driver';
  import Mesh from '$lib/engine/geom/mesh';
  import EndlessScroller from './EndlessScroller.svelte';
  import Ticker from './Ticker.svelte';

  const scripts = [
    Engine,
    [...cityGrid, ...cityGrid, ...cityGrid].join(';'),
    Cube,
    WebGLRenderDriver,
    Mesh
  ].map(reformat);

  function reformat(obj: object | string): string {
    return obj
      .toString()
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/([{};])/g, '$1\n');
  }

  function hexify(str: string) {
    return str
      .replaceAll(/[\s]+/g, ' ')
      .split('')
      .map((s) => s.codePointAt(0) || 0)
      .map((s) => (s < 16 ? '0' : '') + s.toString(16))
      .join(' ');
  }

  const hexCode = hexify(Cube.toString());
</script>

<section>
  <div class="ticker">
    <div class="ticker-0">
      <Ticker>{hexCode}</Ticker>
    </div>
    <div class="ticker-1">
      <Ticker>{hexCode}</Ticker>
    </div>
  </div>

  {#each scripts as script, i}
    <div class={`scroller scroller-${i}`}>
      <EndlessScroller>
        <pre>{script}</pre>
      </EndlessScroller>
    </div>
  {/each}
</section>

<style lang="postcss">
  section {
    @apply relative
      h-32
      cursor-default
      select-none
      overflow-hidden
      bg-black
      bg-gradient-to-br
      from-fungreen-950/40
      to-fungreen-800/30;
  }

  .scroller {
    @apply absolute
      left-0
      top-0
      h-full
      w-full
      p-2;

    --duration: 10s;
    --delay: 0s;
  }

  .scroller-0 {
    @apply w-1/2
      font-bold;
  }

  .scroller-1 {
    @apply left-1/3
      scale-125
      opacity-50;

    --delay: -4s;
    --duration: 15s;
  }

  .scroller-2 {
    @apply left-2/3
      -translate-x-12
      opacity-75;

    --delay: -9s;
  }

  .scroller-3 {
    @apply left-3/4
      scale-150
      text-2xl
      opacity-50;

    --delay: -7s;
    --duration: 25s;
  }

  .scroller-4 {
    @apply left-3/4
      opacity-40;

    --delay: -12s;
    --duration: 40s;
  }

  .ticker-0,
  .ticker-1 {
    @apply relative
      h-24
      text-8xl
      font-medium
      uppercase
      opacity-20;
  }

  .ticker-1 {
    @apply -top-6
      text-5xl
      font-thin
      text-fungreen-900;
  }

  :global(.ticker-0 pre),
  :global(.ticker-1 pre) {
    --delay: -8s;
    --duration: 64s;
  }

  :global(.ticker-1 pre) {
    --duration: 32s;
  }

  pre {
    @apply text-xs
      text-fungreen-800;
  }
</style>
