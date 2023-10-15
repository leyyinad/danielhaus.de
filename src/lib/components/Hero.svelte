<script lang="ts">
	import Engine from '$lib/components/Engine.svelte';
	import anim from '$lib/led-anim';
	import Timeline from '$lib/timeline';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Leds from './Leds.svelte';
	import ScrollDownArrow from './ScrollDownArrow.svelte';

	const run_engine = true;
	const engine_only = false;

	const trackNames = ['led', 'sig', 'txt', 'cty', 'arr'];

	const timeline = new Timeline();

	for (const name of trackNames) {
		timeline.addTrack(name);
	}

	/*
	 * 1. led anim, centered
	 * 2. move leds to target position
	 * 3. swipe signature
	 * 4. type text with cursor
	 * 5. fade in city anim
	 */

	timeline.addClip('led', 0.25, 60, { active: true });
	timeline.addClip('led', 0, 2, { center: true });
	timeline.addClip('led', 0, 10, { opacity: 0 }, { opacity: 1 });

	timeline.addClip('sig', 5, 60, { active: true });
	timeline.addClip('txt', 7, 60, { active: true });
	timeline.addClip('cty', 10, 60, { active: true });
	timeline.addClip('arr', 15, 60, { active: true });

	timeline.init();

	let state: { [key: string]: { [key: string]: any } } = timeline.state(0);

	let timer: number | undefined;
	let t0 = 0;

	const tick = () => {
		state = timeline.state((new Date().getTime() - t0) * 0.001);
		// console.log(state);
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
				class:center={state.led.center || true}
				style={`opacity: ${state.led.opacity}`}
			>
				<Leds width={64} height={64} pw={3} ph={3} gap={1} fn={anim} />
			</figure>
		{/if}

		{#if !engine_only}
			<div class="title">
				{#if state.sig.active}
					<img src="sig.svg" class="signature" alt="Daniel Haus signature" transition:fade />
					<h1 transition:fade>D. Haus</h1>
				{/if}
				{#if state.txt.active}
					<h2 transition:fade>
						IT-Berater<span class="opacity-25">,</span><br />Softwareentwickler
					</h2>
				{/if}
			</div>
		{/if}
	</div>

	{#if !engine_only && state.arr.active}
		<ScrollDownArrow />
	{/if}

	{#if run_engine && state.cty.active}
		<div class="ecity">
			<Engine />
		</div>
	{/if}
</div>

<style lang="postcss">
	.hero {
		@apply /**/
			relative
			h-screen
			/**/;
	}

	.content {
		@apply /**/
			container
			mx-auto
			pt-32
		  z-10
			w-6/12
			md:absolute
			md:top-[50vh]
			md:left-[33%]
			md:-mt-[15vh]
			md:w-6/12
			md:pt-0
			md:flex
		  /**/;
	}

	.signature {
		@apply /**/
  		opacity-50
		  relative
		  mb-4
		  md:-left-4
		  /**/;
	}

	.profile-image {
		@apply /**/
  		h-64
			mb-8
			w-full
			md:relative
			md:mb-0
			md:-left-14
			lg:max-w-[14rem]
		  /**/;
	}

	.title {
		@apply /**/
			md:w-8/12
			md:mx-0
			xl:w-6/12
			/**/;
	}

	h1 {
		@apply /**/
			text-xs
			text-right
			tracking-tight
			text-bluebirth-50
			opacity-25
			-mt-3
			sm:text-sm
			sm:-mt-6
  	  /**/;
	}

	h2 {
		@apply /**/
			font-semibold
			text-2xl
			mt-4
			tracking-tight
			text-bluebirth-50
			sm:text-4xl
			md:mt-8
			/**/;
	}

	.ecity {
		@apply /**/
		 	h-screen
			w-full
			absolute
		  top-0
		  left-0
			z-0
			/**/;
	}
</style>
