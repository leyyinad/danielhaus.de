<img src="sig.svg" class="signature" alt="Daniel Haus signature" />

<style lang="postcss">
  .signature {
    @apply /**/
  		/**/
			relative
		  mb-4
		  max-w-xs
		  opacity-50
		  md:-left-4;

    clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);

    animation: 3s ease-out forwards wipe;
  }

  @keyframes wipe {
    from {
      clip-path: polygon(0% 0%, 0% 0%, -20% 100%, 0% 100%);
    }

    to {
      clip-path: polygon(0% 0%, 120% 0%, 100% 100%, 0% 100%);
    }
  }
</style>
