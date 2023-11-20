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

	const timeline = new Timeline({
		led: [
			[0, 1, { active: false }, { active: true }],
			[0.25, 60, { active: true }],
			[0, 7, { centered: true }, { centered: false }],
			[7, 9, { opacity: 1.0 }, { opacity: 0.8 }]
		],

		sig: [[9, 60, { active: true }]],
		nam: [[12, 60, { active: true }]],
		txt: [[12, 60, { active: true }]],
		cty: [[12, 60, { active: true }]],
		arr: [[20, 60, { active: true }]]
	});

	let state = timeline.state(0);

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
					<Signature />
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
		<div class="ecity" transition:fade={{ duration: 2000 }}>
			<Engine />
		</div>
	{/if}
</div>

<style lang="postcss">
	.hero {
		@apply relative
			h-screen
			min-h-[56.25vw];
	}

	.content {
		@apply container
			z-10
		  mx-auto
			w-6/12
			pt-32
			md:absolute
			md:left-1/4
			md:top-[50vh]
			md:-mt-[15vh]
			md:flex
		  md:pt-0;
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
			md:-translate-x-5
			md:-translate-y-5
		  md:scale-75;

		transition-property: left, transform;
		transition-duration: 1s;
		transition-timing-function: ease-in-out;
	}

	.profile-image.centered {
		@apply relative
			left-1/3
			translate-x-0
			translate-y-1/4
			md:left-1/3
			md:translate-y-0
			md:scale-100;
	}

	.title {
		@apply ml-0
			md:ml-12
			md:w-10/12
			xl:ml-0
			xl:w-6/12;
	}

	h1 {
		@apply -mt-3
			text-right
			text-xs
			tracking-tight
			text-bluebirth-50
			opacity-25
			sm:-mt-6
  	  sm:text-sm;
	}

	h2 {
		@apply mt-4
			text-2xl
			font-semibold
			tracking-tight
			text-bluebirth-50
			sm:text-4xl
			md:mt-0
			md:text-3xl
			lg:text-4xl;
	}

	.ecity {
		@apply absolute
			left-0
		  top-0
		  z-0
			h-screen
			w-full;
	}
</style>
