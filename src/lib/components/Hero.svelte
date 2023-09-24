<script>
	import Engine from '$lib/components/engine/Engine.svelte';
	import anim from '$lib/led-anim';
	import Leds from './Leds.svelte';
	import ScrollDownArrow from './ScrollDownArrow.svelte';

	const run_engine = false;
</script>

<div class="hero">
	<div class="content">
		<figure class="profile-image">
			<!-- <img
				class="object-contain"
				src="daniel-profile-px.png"
				alt="Stilisiertes Selbstportrait von Daniel Haus"
			/> -->
			<Leds width={32} height={32} pw={8} ph={8} gap={1} fn={anim} />
		</figure>

		<div class="title hidden">
			<img src="sig.svg" class="signature" alt="Daniel Haus signature" />
			<h1>D. Haus</h1>
			<h2>
				IT-Berater<span class="opacity-50">,</span><br />Softwareentwickler
			</h2>
		</div>
	</div>

	<ScrollDownArrow />

	<div class="ecity">
		{#if run_engine}
			<Engine />
		{/if}
	</div>
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
			w-6/12
		  z-10
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
			/* opacity-50 */
			mb-8
			w-full
			text-center
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
			opacity-50
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
			absolute
		  top-0
		  left-0
			z-0
			/**/;
	}
</style>
