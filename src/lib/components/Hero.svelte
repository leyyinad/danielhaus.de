<script lang="ts">
  import anim from '$lib/led-anim';
  import Timeline from '$lib/timeline';
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Signature from './Signature.svelte';
  import Engine from './widgets/Engine.svelte';
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
</script>

<div class="hero">
  <div class="content">
    {#if state.led.active}
      <figure
        class="profile-image"
        class:centered={state.led.centered}
        style={`opacity: ${state.led.opacity}`}
      >
        <Leds width={64} height={64} pw={3} ph={3} gap={1} fn={anim} />
      </figure>
    {/if}

    {#if !engine_only}
      <div class="title">
        {#if state.sig.active}
          <Signature opacity={state.sig.opacity} />
        {/if}

        {#if state.nam.active}
          <h1 transition:fade>D. Haus</h1>
        {:else}
          <h1 style="opacity: 0">D. Haus</h1>
        {/if}

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
    <div class="ecity" transition:fade={{ duration: 7000 }}>
      <Engine />
    </div>
  {/if}
</div>

<style lang="postcss">
  .hero {
    @apply relative
      h-auto
      min-h-screen
      md:h-screen
      md:min-h-[56.25vw];
  }

  .content {
    @apply container
      z-10
      mx-auto
      min-h-[40rem]
      w-8/12
      max-w-[16rem]
      pt-28
      sm:w-6/12
      md:flex
      md:max-w-none
      md:pt-[35vh];
  }

  .profile-image {
    @apply relative
      left-1/3
      mb-8
      h-64
      w-full
      max-w-[33%]
      md:left-0
      md:mb-0
      md:-translate-y-5
      md:translate-x-5
      md:scale-75
      lg:translate-y-0
      xl:-translate-x-5;

    transition-property: left, transform;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
  }

  .profile-image.centered {
    @apply relative
      left-1/4
      translate-x-1/4
      translate-y-1/4
      md:translate-y-0
      md:scale-100;
  }

  .title {
    @apply ml-0
      max-w-xs
      flex-shrink-0
      -translate-y-5
      md:ml-12
      md:w-6/12
      md:translate-y-0
      xl:ml-0
      xl:w-6/12;
  }

  h1 {
    @apply text-right
      text-xs
      tracking-tight
      text-bluebirth-50
      opacity-25
      sm:text-sm
      md:-mt-3;
  }

  h2 {
    @apply mt-4
      text-2xl
      font-semibold
      tracking-tight
      text-bluebirth-50
      drop-shadow-[0_0_16px_rgba(241,243,255,.25)]
      sm:text-4xl
      lg:text-4xl;
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
