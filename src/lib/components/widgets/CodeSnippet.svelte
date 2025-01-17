<script lang="ts">
  import cityGrid from '$lib/city/city-grid';
  import Cube from '$lib/city/models/cube';
  import { Engine } from '$lib/engine';
  import WebGLRenderDriver from '$lib/engine/drivers/webgl/webgl-render-driver';
  import Mesh from '$lib/engine/geom/mesh';
  import { onMount } from 'svelte';
  import EndlessScroller from './EndlessScroller.svelte';
  import Ticker from './Ticker.svelte';

  let scripts: string[] = [];
  let hexCode = '';

  const init = () => {
    scripts = [
      Engine,
      [...cityGrid, ...cityGrid, ...cityGrid].join(';'),
      Cube,
      WebGLRenderDriver,
      Mesh
    ].map(reformat);

    hexCode = hexify(Cube.toString());
  };

  const reformat = (obj: object | string) =>
    obj
      .toString()
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/([{};])/g, '$1\n');

  const hexify = (str: string) =>
    str
      .replaceAll(/[\s]+/g, ' ')
      .split('')
      .map((s) => s.codePointAt(0) || 0)
      .map((s) => (s < 16 ? '0' : '') + s.toString(16))
      .join(' ');

  onMount(init);
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

<style>
  section {
    position: relative;
    background-image: linear-gradient(
      to bottom right,
      rgb(from var(--fungreen-950) r g b / 20%),
      right,
      rgb(from var(--fungreen-900) r g b / 10%)
    );
    background-color: black;
    height: 8rem;
    overflow: hidden;
    user-select: none;
  }

  section::before {
    position: absolute;
    z-index: 10;
    inset: 0;
    background-image: linear-gradient(
      to bottom,
      rgb(0 0 0 / 80%),
      rgb(0 0 0 / 20%),
      rgb(0 0 0 / 80%)
    );
    content: '';
  }

  .scroller {
    position: absolute;
    inset: 0;
    padding: 1.5rem;
    width: 100%;
    height: 100%;
    --duration: 10s;
    --delay: 0s;
  }

  .scroller-0 {
    width: 50%;
    font-weight: 700;
  }

  .scroller-1 {
    left: 33.333333%;
    transform: scale(1.25);
    opacity: 0.5;
    --delay: -4s;
    --duration: 15s;
  }

  .scroller-2 {
    left: 66.666667%;
    transform: translateX(-3rem);
    opacity: 0.75;
    --delay: -9s;
  }

  .scroller-3 {
    left: 75%;
    transform: scale(1.5);
    opacity: 0.5;
    font-size: 1.5rem;
    line-height: 2rem;
    --delay: -7s;
    --duration: 25s;
  }

  .scroller-4 {
    left: 75%;
    opacity: 0.4;
    --delay: -12s;
    --duration: 40s;
  }

  .ticker-0,
  .ticker-1 {
    position: relative;
    opacity: 0.1;
    margin: 0;
    padding: 0;
    height: 6rem;
    color: var(--fungreen-200);
    font-weight: 300;
    font-size: 6rem;
    line-height: 1;
    letter-spacing: -0.5rem;
    --delay: -8s;
    --duration: 64s;
  }

  .ticker-1 {
    top: -1rem;
    opacity: 0.2;
    color: var(--fungreen-500);
    font-weight: 100;
    font-size: 3rem;
    line-height: 1;
    --duration: 32s;
  }

  pre {
    color: var(--fungreen-800);
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
