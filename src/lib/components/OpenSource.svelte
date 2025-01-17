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
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    background-color: var(--violetshirt-950);
    padding-top: 2rem;
    padding-bottom: 2rem;

    /*
    @apply border-y-2
      border-y-black
      bg-violetshirt-950
      py-8;
      */
  }

  article {
    margin-right: auto;
    margin-left: auto;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    width: var(--container-width);
    max-width: 1024px;
    color: rgb(from var(--violetshirt-300) r g b / 80%);
    font-size: 1rem;
    line-height: 1.5rem;
    hyphens: auto;

    @media (min-width: 640px) {
      font-size: 1.25rem /* 20px */;
      line-height: 1.75rem /* 28px */;
    }

    @media (min-width: 1024px) {
      max-width: 64rem /* 1024px */;
    }

    /*
    @apply prose prose-invert text-base;
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
      */
  }

  article a {
    color: rgb(from var(--violetshirt-300) r g b / 80%);
    font-weight: 300;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    /*
    @apply font-light
      text-violetshirt-300/80
      no-underline
      hover:underline
      hover:underline-offset-4;*/
  }

  article a strong {
    color: white;
    font-weight: 500;

    /* @apply font-medium text-white;*/
  }

  h4 {
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    margin-top: 1.25rem;
    margin-bottom: 1rem;
    color: var(--violetshirt-300);
    font-weight: 900;
    font-size: 1.875rem;
    line-height: 2.25rem;

    @media (min-width: 768px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    /*
    @apply mb-4
			mt-5
			text-3xl
			font-black
      text-violetshirt-300
      drop-shadow
      md:text-4xl;
      */

    + p {
      margin-top: 0;
    }
  }

  p {
    margin: 1.25em 0;

    strong {
      font-weight: 600;
    }
  }
</style>
