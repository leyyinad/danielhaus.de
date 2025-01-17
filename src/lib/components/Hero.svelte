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
        <InViewport enter={() => leds.start()} leave={() => leds.pause()}>
          <Leds bind:this={leds} width={64} height={64} pw={3} ph={3} gap={1} fn={anim} />
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
    <InViewport enter={() => engine.start()} leave={() => engine.pause()}>
      <div class="ecity" transition:fade={{ duration: 7000 }}>
        <Engine bind:this={engine} />
      </div>
    </InViewport>
  {/if}
</div>

<style>
  .hero {
    position: relative;
    height: 100vh;
  }

  .content {
    transform: translateY(16vh);
    margin-right: auto;
    margin-left: auto;
    width: var(--container-width);
    max-width: 640px;

    @media (min-width: 640px) {
      display: flex;
    }

    @media (orientation: landscape) {
      transform: translateY(18vh);
    }

    @media (min-width: 768px) {
      transform: translateY(33vh);
    }
  }

  .profile-image {
    position: relative;
    left: 16.6666667%;
    transform: translateY(0);
    transition-duration: 1s;
    transition-property: left, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0;
    aspect-ratio: 1 / 1;
    width: 66.666667%;

    @media (min-width: 640px) {
      left: 0;
      aspect-ratio: 1 / 1;
      width: 38.2%;
    }

    @media (min-width: 768px) {
      left: -2%;
    }

    &.centered {
      transform: translateY(5rem);

      @media (min-width: 640px) {
        left: 50%;
        transform: translate(-50%, 0);
      }

      @media (orientation: landscape) and (min-width: 768px) {
        transform: translateY(2.5rem);
      }
    }
  }

  .title {
    position: relative;
    left: 12.5%;
    width: 75%;

    @media (min-width: 640px) {
      left: 2%;
      padding-right: 3rem;
      padding-left: 1rem;
      width: 61.8%;
    }
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
  }

  h2 {
    filter: drop-shadow(0 0 16px rgba(241, 243, 255, 0.25));
    margin-top: 1rem;
    color: var(--bluebirth-50);
    font-weight: 600;
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
  }

  .ecity {
    position: absolute;
    z-index: 0;
    inset: 0;
  }
</style>
