<script lang="ts">
</script>

<footer>
	<div>
		<div class="imprint">
			<h4>IT-Beratung und Softwareentwicklung</h4>

			<h5>Inhaltlich verantwortlich</h5>
			<p>&hellip;</p>

			<p>Es gelten die Regeln des gesunden Menschenverstands.</p>
		</div>
	</div>
</footer>

<style lang="postcss">
	footer {
		@apply /**/
      bg-black
      text-bluebirth-200
      h-96
      /**/;
	}

	footer > div {
		@apply /**/
      container
      mx-auto
      max-w-screen-lg
			px-6
			py-12
      /**/;
	}

	.imprint {
		@apply /**/
			prose
			dark:prose-invert
      /**/;
	}
</style>
