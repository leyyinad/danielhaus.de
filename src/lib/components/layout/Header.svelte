<script lang="ts">
  import { onMount } from 'svelte';

  let img: HTMLImageElement;

  onMount(() => {
    setTimeout(() => {
      img.classList.remove('logo-hidden');
    }, 1000);
  });
</script>

<header>
  <div>
    <img class="logo logo-hidden" src="dh-logo.svg" alt="dh logo" bind:this={img} />
  </div>
</header>

<style lang="postcss">
  header {
    @apply absolute
			left-0
			top-0
			z-30
			w-full;
  }

  div {
    @apply container
			mx-auto
			max-w-screen-lg
			p-8;
  }

  .logo {
    @apply relative
		h-8
		w-auto
		opacity-100
		transition-opacity
		delay-5000
		duration-3000
		ease-in
		md:h-16;
  }

  .logo.logo-hidden {
    @apply opacity-0;
  }
</style>
