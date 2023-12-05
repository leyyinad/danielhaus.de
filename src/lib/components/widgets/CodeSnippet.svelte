<script>
  import cityGrid from '$lib/city/city-grid';
  import { Engine } from '$lib/engine';
  import EndlessScroller from './EndlessScroller.svelte';

  const engineSrc = Engine.toString();
  const grid = cityGrid
    .toString()
    .match(/.{1,30}/g)
    ?.join('\n');

  const scripts = [engineSrc, [grid, grid, grid].join('\n'), engineSrc, engineSrc, engineSrc];
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
    @apply left-3/4
      scale-150
      text-2xl
      opacity-50;

    --delay: -7s;
    --duration: 8s;
  }

  .scroller-2 {
    @apply left-1/3
      scale-125
      opacity-50;

    --delay: -4s;
    --duration: 5s;
  }

  .scroller-3 {
    @apply left-2/3
      -translate-x-12
      opacity-75;

    --delay: -9s;
  }

  .scroller-4 {
    @apply left-3/4
      opacity-40;

    --delay: -12s;
  }

  pre {
    @apply text-xs
      text-fungreen-800;
  }
</style>
