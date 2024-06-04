<section>
  <article>
    <h4>Open Source</h4>

    <p>
      Diese Website ist freie, quelloffene Sofware. Die Quelltexte sind öffentlich und kostenlos
      unter der <a href="https://opensource.org/license/mit" target="_blank" rel="external noopener"
        >MIT-Lizenz</a
      >
      einseh- und weiterverwendbar.
    </p>

    <p>
      <a href="https://gitlab.com/leyyinad/danielhaus.de" target="_blank" rel="external noopener">
        https://gitlab.com/<strong>leyyinad/danielhaus.de</strong>
      </a>
    </p>
  </article>
</section>

<style lang="postcss">
  section {
    @apply border-y-2
      border-y-violetshirt-900
      bg-violetshirt-950
      py-8;
  }

  article {
    @apply container
      prose
      prose-invert
      mx-auto
      max-w-screen-lg
      hyphens-auto
      px-6
      text-base
      text-violetshirt-300/80
			sm:text-xl
			lg:max-w-5xl;
  }

  article a {
    @apply font-extralight
      text-violetshirt-500
      no-underline
      hover:underline;
  }

  article a strong {
    @apply font-normal text-violetshirt-300;
  }

  h4 {
    @apply mb-4
			mt-5
			text-3xl
			font-black
      text-violetshirt-300
      md:text-4xl;
  }
</style>
