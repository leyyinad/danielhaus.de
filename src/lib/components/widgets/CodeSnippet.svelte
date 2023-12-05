<script lang="ts">
  import cityGrid from '$lib/city/city-grid';
  import Cube from '$lib/city/models/cube';
  import { Engine } from '$lib/engine';
  import WebGLRenderDriver from '$lib/engine/drivers/webgl/webgl-render-driver';
  import Mesh from '$lib/engine/geom/mesh';
  import EndlessScroller from './EndlessScroller.svelte';

  const scripts = [
    Engine,
    [...cityGrid, ...cityGrid, ...cityGrid].join(';'),
    Cube,
    WebGLRenderDriver,
    Mesh
  ].map(reformat);

  function reformat(obj: object): string {
    return obj
      .toString()
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/([{};])/g, '$1\n');
  }
</script>

<section>
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
      bg-gradient-to-r
      from-fungreen-900/20
      to-fungreen-700/20;
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

  pre {
    @apply text-xs
      text-fungreen-800;
  }
</style>
