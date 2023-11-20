<script lang="ts">
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
        Daniel Haus<br />
        IT-Beratung &amp; Softwareentwicklung
      </p>

      <h5>Inhaltlich verantwortlich</h5>

      <span>Daniel Haus</span>
      <address>
        Limburger Str. 36<br />
        65510 Idstein
      </address>

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
    </div>

    <div class="footer-note">
      <p>Es gelten die Regeln des gesunden Menschenverstands.</p>
    </div>
  </div>
</footer>

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

  .skramble a:hover {
    @apply underline underline-offset-2;
  }

  footer {
    @apply bg-black
      text-bluebirth-200;
  }

  footer > div {
    @apply container
      mx-auto
			max-w-screen-lg
			px-6
      py-12;
  }

  .footer-note {
    @apply mt-5
			border-t
			border-bluebirth-400/25
			py-4
			text-center
			text-sm
			opacity-75;
  }

  .imprint {
    @apply text-bluebirth-100
			opacity-100;
  }

  h4 {
    @apply mb-4
			text-2xl
      font-light
			opacity-50;
  }

  h5 {
    @apply mt-6
			font-normal
			opacity-60;
  }

  p {
    @apply m-0 p-0;
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
			opacity-40;
  }
</style>
