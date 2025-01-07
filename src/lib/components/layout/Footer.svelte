<script lang="ts">
  import SquarePattern from '../widgets/SquarePattern.svelte';

  const decodeLink = (event: Event) => {
    const target = event.currentTarget as HTMLAnchorElement;

    let link = ['before', 'after']
      .map((s) => window.getComputedStyle(target, `:${s}`).content ?? '')
      .map((s) => s.replaceAll('"', ''))
      .join(target.textContent ?? '')
      .replaceAll(/\s+/gi, '');

    if (target.classList.contains('phone')) {
      link = link.replace(/^\+/, '00');
      link = `tel:${link}`;
    } else if (target.classList.contains('email')) {
      link = `mailto:${link}`;
    }

    target.href = link;
  };
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

          <h5>USt-IdNr.</h5>
          <span>DE365921448</span>
        </div>

        <div class="kontakt">
          <h5>Kontakt</h5>
          <p>
            <span>E-Mail</span>
            <a
              href="/"
              onfocus={decodeLink}
              onmouseover={decodeLink}
              class="no-spam email"
              aria-label="E-Mail-Adresse">@</a
            ><br />
            <span>Telefon</span>
            <a
              href="/"
              onfocus={decodeLink}
              onmouseover={decodeLink}
              class="no-spam phone"
              aria-label="Telefonnummer">&nbsp;</a
            >
          </p>
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
  .no-spam.email::before {
    content: 'd';
  }

  .no-spam.email::after {
    content: 'danielhaus.de';
  }

  .no-spam.phone::before {
    content: '+49 170';
  }

  .no-spam.phone::after {
    content: '9621919';
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
