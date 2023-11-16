<script lang="ts">
	let y: number;
</script>

{#if y < 20}
	<div class="arrs">
		<div class="arr"></div>
		<div class="arr"></div>
		<div class="arr"></div>
	</div>
{/if}

<svelte:window bind:scrollY={y} />

<style lang="postcss">
	.arrs {
		@apply /**/
			/**/
			absolute
			left-[50%]
			top-[82%]
			scale-75
			md:top-[90%]
			md:scale-100;
	}

	.arr {
		@apply /**/
			/**/
			absolute
			opacity-0;

		animation: 7s linear 1.6s infinite down-anim;
		transform: scale(50%);
	}

	.arr:nth-child(2) {
		animation-delay: 1.9s;
	}

	.arr:nth-child(3) {
		animation-delay: 2.2s;
	}

	.arr::before,
	.arr::after {
		@apply /**/
      /**/
      block
      h-2
      w-9
      -translate-x-7
      rotate-45
      bg-white;

		content: '';
		border-radius: 0.25rem;
	}

	.arr::after {
		@apply /**/
      /**/
      -translate-x-2
      -translate-y-2
      -rotate-45;
	}

	@keyframes down-anim {
		0% {
			opacity: 0;
			transform: translateY(-2.5rem);
		}

		5% {
			opacity: 0.5;
		}

		10% {
			opacity: 0.5;
		}

		15% {
			opacity: 0;
			transform: translateY(2.5rem);
		}
	}
</style>
