<script lang="ts">
  import SquarePattern from '../widgets/SquarePattern.svelte';

  const email = import.meta.env.CONTACT_EMAIL;
  const phone = import.meta.env.CONTACT_PHONE;

  function unskramble(el: HTMLElement) {
    return [...el.querySelectorAll('u, b')].map((n) => n.textContent).join('');
  }

  function autolink(event: Event) {
    const a = event.currentTarget as HTMLAnchorElement;

    if (a.classList.contains('autolink')) {
      const value = unskramble(a).replaceAll(/\s+/gi, '');

      let proto = '';
      if (a.classList.contains('autolink-email')) {
        proto = 'mailto:';
      } else if (a.classList.contains('autolink-phone')) {
        proto = 'tel:';
      }

      a.href = proto + value;

      a.classList.remove('autolink');
    }
  }
</script>

<footer>
  <div>
    <div class="imprint">
      <h4>Impressum</h4>

      <p>
        <strong>Daniel Haus</strong><br />
        IT-Beratung &amp; Softwareentwicklung
      </p>

      <div class="columns">
        <div class="editor">
          <h5>Inhaltlich verantwortlich</h5>

          <span>Daniel Haus</span>
          <address>
            Limburger Str. 36<br />
            65510 Idstein
          </address>
        </div>

        <div class="kontakt skramble">
          <!-- eslint-disable svelte/no-at-html-tags -->
          <h5>Kontakt</h5>
          <p>
            <span>E-Mail</span>
            <a href="/" on:focus={autolink} on:mouseover={autolink} class="autolink autolink-email"
              >{@html email}</a
            ><br />
            <span>Telefon</span>
            <a href="/" on:focus={autolink} on:mouseover={autolink} class="autolink autolink-phone"
              >{@html phone}</a
            >
          </p>
          <!-- eslint-enable svelte/no-at-html-tags -->
        </div>

        <div class="links">
          <ul>
            <li>
              <a href="https://github.com/leyyinad" target="_blank" rel="noopener"
                ><strong>github</strong>.com/leyyinad</a
              >
            </li>
            <li>
              <a href="https://gitlab.com/leyyinad" target="_blank" rel="noopener"
                ><strong>gitlab</strong>.com/leyyinad</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <SquarePattern />
</footer>

<div class="footnote">
  <p>Es gelten die Regeln des gesunden Menschenverstands.</p>
</div>

<style lang="postcss">
  .skramble :global(i) {
    display: inline-block;
    overflow: hidden;
    height: 1px;
    width: 1px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.01;
    user-select: none;
  }

  .skramble :global(u),
  .skramble :global(b) {
    text-decoration: inherit;
    font-weight: inherit;
    user-select: text;
  }

  .columns {
    @apply md:flex;
  }

  .columns > div {
    @apply w-full
      md:w-1/2;
  }

  footer {
    @apply bg-black;
  }

  footer > div {
    @apply container
      mx-auto
			max-w-screen-lg
			px-6
      py-12;
  }

  .footnote {
    @apply bg-bluebirth-950
    p-7
    text-center
    text-sm;
  }

  .footnote p {
    @apply font-semibold
      text-bluebirth-400;
  }

  .imprint {
    @apply text-bluebirth-100;
  }

  h4 {
    @apply mb-4
			text-3xl
      font-black;
  }

  h5 {
    @apply mt-6;
  }

  p {
    @apply m-0
      p-0;
  }

  p,
  .editor {
    @apply font-light
      text-kashmirgrey-300;
  }

  h5,
  strong {
    @apply font-bold
      text-kashmirgrey-100;
  }

  address {
    @apply my-0
		  py-0
		  not-italic;
  }

  .kontakt p span {
    @apply inline-block
		  w-16
			whitespace-nowrap
      text-kashmirgrey-500;
  }

  .links {
    @apply mt-6
      md:mt-12;
  }

  .links a {
    @apply text-kashmirgrey-300;
  }

  a:hover {
    @apply underline
      underline-offset-2;
  }
</style>
