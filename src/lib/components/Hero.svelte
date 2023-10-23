<script lang="ts">
	import Engine from '$lib/components/Engine.svelte';
	import anim from '$lib/led-anim';
	import Timeline from '$lib/timeline';
	import { onDestroy, onMount } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Leds from './Leds.svelte';
	import ScrollDownArrow from './ScrollDownArrow.svelte';

	const run_engine = true;
	const engine_only = false;

	const timeline = new Timeline({
		led: [
			[0, 0, { active: false }, { active: true }],
			[0.25, 60, { active: true }],
			[0, 7, { centered: true }, { centered: false }],
			[7, 9, { opacity: 1.0 }, { opacity: 0.8 }]
		],

		sig: [[9, 60, { active: true }]],
		txt: [[12, 60, { active: true }]],
		cty: [[15, 60, { active: true }]],
		arr: [[20, 60, { active: true }]]
	});

	/*
	 * 1. led anim, centered
	 * 2. move leds to target position
	 * 3. swipe signature
	 * 4. type text with cursor
	 * 5. fade in city anim
	 */

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
		{#if state.led.active || true}
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
		<div class="ecity" transition:fade={{ duration: 1000, easing: sineInOut }}>
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
			/* md:left-[33%] */
			md:left-1/4
			md:-mt-[15vh]
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
			left-1/3
			relative
			md:mb-0
			md:left-0
			md:scale-75
			md:-translate-x-5
			md:-translate-y-5
			max-w-[33%]
		  /**/;

		transition-property: left, transform;
		transition-duration: 1s;
		transition-timing-function: ease-in-out;
	}

	.profile-image.centered {
		@apply /**/
			relative
			left-1/3
			translate-x-0
			translate-y-1/4
			md:translate-y-0
			md:scale-100
			md:left-1/3
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
			md:mt-0
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
