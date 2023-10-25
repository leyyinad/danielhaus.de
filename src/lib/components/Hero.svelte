<script lang="ts">
	import anim from '$lib/led-anim';
	import Timeline from '$lib/timeline';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Engine from './Engine.svelte';
	import Leds from './Leds.svelte';
	import ScrollDownArrow from './ScrollDownArrow.svelte';
	import Signature from './Signature.svelte';
	import Typer from './Typer.svelte';

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

	let state: { [key: string]: { [key: string]: any } } = timeline.state(0);

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
		@apply /**/
			relative
			h-screen
			min-h-[56.25vw]
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
			md:left-1/4
			md:-mt-[15vh]
			md:pt-0
			md:flex
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
			ml-0
			md:w-8/12
			md:ml-12
			xl:ml-0
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
