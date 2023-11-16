<script lang="ts">
	const email = import.meta.env.VITE_CONTACT_EMAIL;
	const phone = import.meta.env.VITE_CONTACT_PHONE;
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

			<div class="kontakt">
				<h5>Kontakt</h5>
				<p>
					<span>E-Mail</span>
					{email}<br />
					<span>Tel.</span>
					{phone}
				</p>
			</div>
		</div>

		<div class="footer-note">
			<p>Es gelten die Regeln des gesunden Menschenverstands.</p>
		</div>
	</div>
</footer>

<style lang="postcss">
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
