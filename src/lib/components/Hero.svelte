<script lang="ts">
  import anim from '$lib/led-anim';
  import Timeline from '$lib/timeline';
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Signature from './Signature.svelte';
  import Engine from './widgets/Engine.svelte';
  import InViewport from './widgets/InViewport.svelte';
  import Leds from './widgets/Leds.svelte';
  import ScrollDownArrow from './widgets/ScrollDownArrow.svelte';
  import Typer from './widgets/Typer.svelte';

  const run_engine = true;
  const engine_only = false;

  interface TimelineState {
    [key: string]: {
      active?: boolean;
      centered?: boolean;
      opacity?: number;
    };
  }

  const timeline = new Timeline({
    led: [
      [0, 1, { active: false }, { active: true }],
      [0.25, 60, { active: true }],
      [0, 7, { centered: true }, { centered: false }],
      [7, 9, { opacity: 1.0 }, { opacity: 0.8 }]
    ],

    sig: [
      [9, 60, { active: true }],
      [9, 9, { opacity: 1.0 }],
      [11, 13, { opacity: 1.0 }, { opacity: 0.5 }]
    ],

    nam: [[12, 60, { active: true }]],
    txt: [[12, 60, { active: true }]],
    cty: [[12, 60, { active: true }]],
    arr: [[20, 60, { active: true }]]
  });

  let state: TimelineState = timeline.state(0) as unknown as TimelineState;

  let timer: number | undefined;
  let t0 = 0;

  const tick = () => {
    state = timeline.state((new Date().getTime() - t0) * 0.001);
  };

  const init = () => {
    t0 = new Date().getTime();
    timer = window.setInterval(tick, 10);
  };

  const cleanup = () => {
    if (timer != null) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  onMount(init);
  onDestroy(cleanup);

  let engineIsInViewport: boolean;
</script>

<div class="hero">
  <div class="content">
    {#if state.led.active}
      <figure
        class="profile-image"
        class:centered={state.led.centered}
        style={`opacity: ${state.led.opacity}`}
      >
        <InViewport>
          <Leds width={64} height={64} pw={3} ph={3} gap={1} fn={anim} />
        </InViewport>
      </figure>
    {/if}

    {#if !engine_only}
      <div class="title">
        <div class="signature">
          {#if state.sig.active}
            <Signature opacity={state.sig.opacity} />
          {/if}

          {#if state.nam.active}
            <h1 transition:fade>D. Haus</h1>
          {:else}
            <h1 style="opacity: 0">D. Haus</h1>
          {/if}
        </div>

        {#if state.txt.active}
          <h2>
            <Typer>
              IT-Berater<span class="opacity-25">,</span><br />Softwareentwickler
            </Typer>
          </h2>
        {/if}
      </div>
    {/if}
  </div>

  {#if !engine_only && state.arr.active}
    <ScrollDownArrow />
  {/if}

  {#if run_engine && state.cty.active}
    <InViewport on:viewport={(event) => (engineIsInViewport = event.detail.isInViewport)}>
      <div class="ecity" transition:fade={{ duration: 7000 }}>
        <Engine active={engineIsInViewport} />
      </div>
    </InViewport>
  {/if}
</div>

<style lang="postcss">
  .hero {
    @apply relative
      h-[100vh];
  }

  .content {
    @apply container
      mx-auto
      max-w-screen-sm
      translate-y-[16vh]
      sm:flex
      md:translate-y-[33vh]
      landscape:translate-y-[18vh]
      landscape:md:translate-y-[33vh];
  }

  .profile-image {
    @apply relative
      left-[16.6666667%]
      aspect-square
      w-2/3
      translate-y-0
      sm:left-0
      sm:aspect-square
      sm:w-[38.2%];

    transition-property: left, transform;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
  }

  .profile-image.centered {
    @apply translate-y-20
      sm:left-1/2
      sm:-translate-x-1/2
      sm:translate-y-0;
  }

  .title {
    @apply relative
      left-[12.5%]
      w-3/4
      sm:left-0
      sm:w-[61.8%]
      sm:pl-4
      sm:pr-12;
  }

  .signature {
    @apply mb-6
      sm:-translate-x-4;

    aspect-ratio: 2.28;
  }

  h1 {
    @apply text-right
      text-xs
      tracking-tight
      text-bluebirth-50
      opacity-25
      sm:-mt-3
      sm:text-sm;
  }

  h2 {
    @apply mt-4
      text-3xl
      font-semibold
      tracking-tight
      text-bluebirth-50
      drop-shadow-[0_0_16px_rgba(241,243,255,.25)]
      sm:text-4xl;
  }

  .ecity {
    @apply absolute
      bottom-0
      left-0
      right-0
      top-0
      z-0;
  }
</style>
