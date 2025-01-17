<script lang="ts">
  import { onMount } from 'svelte';

  let img: HTMLImageElement;

  onMount(() => {
    setTimeout(() => {
      img.classList.remove('logo-hidden');
    }, 1);
  });
</script>

<header>
  <div>
    <img class="logo logo-hidden" src="dh-logo.svg" alt="dh logo" bind:this={img} />
  </div>
</header>

<style lang="postcss">
  header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;

    /*
    @apply absolute
			left-0
			top-0
			z-30
			w-full;
      */
  }

  div {
    margin-right: auto;
    margin-left: auto;
    padding: 2rem;
    width: var(--container-width);

    /*
    @apply container
			mx-auto
			max-w-screen-lg
			p-8;
      */
  }

  .logo {
    position: relative;
    opacity: 1;
    transition-delay: 1s;
    transition-duration: 3s;
    transition-property: opacity;
    transition-timing-function: ease-in;
    height: 2rem;

    @media (min-width: 768px) {
      height: 4rem;
    }

    /*@apply relative
      h-8
      w-auto
      opacity-100
      transition-opacity
      delay-1000
      duration-3000
      ease-in
      md:h-16;*/

    &.logo-hidden {
      opacity: 0;
      /* @apply opacity-0; */
    }
  }
</style>
