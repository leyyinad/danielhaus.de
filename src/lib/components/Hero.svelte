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

  const runEngine = true;
  const engineOnly = false;

  let engine: Engine;
  let leds: Leds;

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
      [0.25, 10, { active: true }],
      [0, 2, { centered: true }, { centered: false }],
      [2, 5, { opacity: 1.0 }, { opacity: 0.8 }]
    ],

    sig: [
      [3, 60, { active: true }],
      [3, 3, { opacity: 1.0 }],
      [4, 5, { opacity: 1.0 }, { opacity: 0.5 }]
    ],

    nam: [[7, 60, { active: true }]],
    txt: [[5, 60, { active: true }]],
    cty: [[5, 60, { active: true }]],
    arr: [[10, 60, { active: true }]]
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
        <InViewport on:enter={() => leds.start()} on:leave={() => leds.pause()}>
          <Leds
            slot="inViewport"
            bind:this={leds}
            width={64}
            height={64}
            pw={3}
            ph={3}
            gap={1}
            fn={anim}
          />
        </InViewport>
      </figure>
    {/if}

    {#if !engineOnly}
      <div class="title">
        <div class="signature">
          {#if state.sig.active}
            <Signature opacity={state.sig.opacity} />
          {/if}

          {#if state.nam.active}
            <h1 transition:fade>Daniel Haus</h1>
          {:else}
            <h1 style="opacity: 0">Daniel Haus</h1>
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

  {#if !engineOnly && state.arr.active}
    <ScrollDownArrow />
  {/if}

  {#if runEngine && state.cty.active}
    <InViewport on:enter={() => engine.start()} on:leave={() => engine.pause()}>
      <div slot="inViewport" class="ecity" transition:fade={{ duration: 7000 }}>
        <Engine bind:this={engine} />
      </div>
    </InViewport>
  {/if}
</div>

<style lang="postcss">
  .hero {
    position: relative;
    height: 100vh;

    /*
    @apply relative
      h-[100vh];
    */
  }

  .content {
    transform: translateY(33vh);
    margin: 0 auto;
    width: var(--container-width);
    max-width: 640px;

    @media (min-width: 640px) {
      display: flex;
    }

    @media (orientation: landscape) {
      transform: translateY(18vh);

      @media (min-width: 768px) {
      }
      transform: translateY(33vh);
    }

    /*
    @apply container
      mx-auto
      max-w-screen-sm
      translate-y-[16vh]
      sm:flex
      md:translate-y-[33vh]
      landscape:translate-y-[18vh]
      landscape:md:translate-y-[33vh];
    */
  }

  .profile-image {
    position: relative;
    left: 16.6666667%;
    transform: translateY(0);
    transition-duration: 1000ms;
    transition-property: left, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    aspect-ratio: 1 / 1;
    width: 66.666667%;

    @media (min-width: 640px) {
      left: 0;
      aspect-ratio: 1 / 1;
      width: 38.2%;
    }

    /*
    @apply relative
      left-[16.6666667%]
      aspect-square
      w-2/3
      translate-y-0
      transition-[left,transform]
      duration-1000
      ease-in-out
      sm:left-0
      sm:aspect-square
      sm:w-[38.2%];
      */
  }

  .profile-image.centered {
    transform: translateY(5rem);

    @media (min-width: 640px) {
      left: 50%;
      transform: translate(-50%, 0);
    }

    @media (orientation: landscape) and (min-width: 768px) {
      transform: translateY(2.5rem);
    }

    /*
    @apply translate-y-20
      sm:left-1/2
      sm:-translate-x-1/2
      sm:translate-y-0
      landscape:md:translate-y-10;
      */
  }

  .title {
    position: relative;
    left: 12.5%;
    width: 75%;

    @media (min-width: 640px) {
      left: 0;
      padding-right: 3rem;
      padding-left: 1rem;
      width: 61.8%;
    }

    /*
    @apply relative
      left-[12.5%]
      w-3/4
      sm:left-0
      sm:w-[61.8%]
      sm:pl-4
      sm:pr-12;
      */
  }

  .signature {
    transform: translateX(-0.75rem);
    margin-bottom: 1.5rem;
    aspect-ratio: 2.28;

    @media (min-width: 640px) {
      transform: translateX(-2rem);
    }

    @media (orientation: landscape) and (min-width: 768px) {
      transform: translateX(-1.25rem);
    }

    /*
    @apply mb-6
      aspect-[2.28]
      -translate-x-3
      sm:-translate-x-8
      landscape:md:-translate-x-5;
      */
  }

  h1 {
    position: relative;
    opacity: 0.25;
    padding-left: 100%;
    height: 1.25rem;
    overflow: hidden;
    color: var(--bluebirth-50);
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.025em;
    text-wrap: nowrap;

    &::after {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      content: 'D. Haus';
      text-wrap: nowrap;
    }

    @media (min-width: 640px) {
      margin-top: -0.75rem;
      height: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    /*
    @apply relative
      h-5
      overflow-hidden
      text-nowrap
      pl-[100%]
      text-xs
      tracking-tight
      text-bluebirth-50
      opacity-25
      after:absolute
      after:right-0
      after:top-0
      after:block
      after:text-nowrap
      after:content-['D._Haus']
      sm:-mt-3
      sm:h-4
      sm:text-sm;
      */
  }

  h2 {
    margin-top: 1rem;
    font-weight: 600;
    drop-shadow: 0 0 16px rgba(241, 243, 255, 0.25);
    color: var(--bluebirth-50);
    font-size: 1.875rem;
    line-height: 2.25rem;

    @media (min-width: 380px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    @media (min-width: 640px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    /*
    @apply mt-4
      text-3xl
      font-semibold
      tracking-tight
      text-bluebirth-50
      drop-shadow-[0_0_16px_rgba(241,243,255,.25)]
      min-[380px]:text-4xl
      sm:text-4xl;
      */
  }

  .ecity {
    position: absolute;
    z-index: 0;
    inset: 0;

    /*
    @apply absolute
      bottom-0
      left-0
      right-0
      top-0
      z-0;
    */
  }
</style>
