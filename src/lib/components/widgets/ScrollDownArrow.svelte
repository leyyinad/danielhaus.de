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
    position: absolute;
    top: 82%;
    left: 50%;
    transform: scale(0.75);

    @media (min-width: 768px) {
      top: 90%;
      transform: scale(1);
    }

    /*
    @apply absolute
			left-[50%]
			top-[82%]
			scale-75
			md:top-[90%]
			md:scale-100;*/
  }

  .arr {
    position: absolute;
    /*  @apply absolute opacity-0;*/
    transform: scale(50%);
    opacity: 0;
    animation: 7s linear 1.6s infinite down-anim;
  }

  .arr:nth-child(2) {
    animation-delay: 1.9s;
  }

  .arr:nth-child(3) {
    animation-delay: 2.2s;
  }

  .arr::before,
  .arr::after {
    display: block;
    transform: translateX(-1.75rem) rotate(45deg);
    border-radius: 0.25rem;
    background-color: white;
    width: 2.25rem;
    height: 0.5rem;
    content: '';

    /*
    @apply block
      h-2
      w-9
      -translate-x-7
      rotate-45
      rounded
      bg-white
      content-[''];
    */
  }

  .arr::after {
    transform: translate(-0.5rem, -0.5rem) rotate(-45deg);

    /*@apply -translate-x-2
      -translate-y-2
      -rotate-45;*/
  }

  @keyframes down-anim {
    0% {
      transform: translateY(-2.5rem);
      opacity: 0;
    }

    5% {
      opacity: 0.5;
    }

    10% {
      opacity: 0.5;
    }

    15% {
      transform: translateY(2.5rem);
      opacity: 0;
    }
  }
</style>
