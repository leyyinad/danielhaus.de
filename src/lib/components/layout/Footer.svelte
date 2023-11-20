<script lang="ts">
  const email = import.meta.env.CONTACT_EMAIL;
  const phone = import.meta.env.CONTACT_PHONE;
</script>

<footer>
  <div>
    <div class="imprint">
      <h4>Daniel Haus – IT-Beratung und Softwareentwicklung</h4>

      <h5>Inhaltlich verantwortlich</h5>

      <span>Daniel Haus</span>
      <address>
        Limburger Str. 36<br />
        65510 Idstein
      </address>

      <div class="kontakt skramble">
        <h5>Kontakt</h5>
        <p>
          <span>E-Mail</span>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html email}<br />
          <span>Tel.</span>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html phone}
        </p>
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
			border-bluebirth-300/25
			py-4
			text-center
			text-sm
			opacity-80;
  }

  .imprint {
    @apply text-bluebirth-100
			opacity-100;
  }

  h4 {
    @apply text-xl
			font-semibold
			opacity-50;
  }

  h5 {
    @apply mb-2
			mt-6
			text-lg
			font-bold
			opacity-50;
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
		  w-14
			whitespace-nowrap
			opacity-50;
  }
</style>
