<script lang="ts">
	import projects from '../projects.json';
</script>

<section>
	<article>
		<h4>Projekte</h4>
		<h5>(Auszug)</h5>

		<ul class="projects">
			{#each projects as project}
				<li>
					<span class="title">{project.title}</span>
					<span class="client">{project.client}</span>
				</li>
			{/each}
		</ul>
	</article>
</section>

<style lang="postcss">
	section {
		@apply /**/
      text-bluebirth-50
      bg-bluebirth-950
      bg-gradient-to-br
      from-bluebirth-950
      to-black
      bg-cover
			py-6
      /**/;

		/* background: #ccc; */
		background-image: url($lib/images/holz.jpg);
	}

	article {
		@apply /**/
      container
		 	mx-auto
			max-w-screen-lg
      text-center
      /**/;

		text-shadow: 1px 1px 3px black;
	}

	h4 {
		@apply /**/
      text-3xl
      font-semibold
      opacity-80
      mb-3
		  /**/;
	}

	h5 {
		@apply /**/
      text-sm
			font-semibold
			mt-3
      mb-8
      opacity-40
		  /**/;
	}

	.projects {
		@apply /**/
      flex
      flex-row
      flex-wrap
      text-sm
      text-left
			px-6
      /**/;
	}

	.projects li {
		@apply /**/
      basis-1/2
      sm:basis-1/2
      md:basis-1/3
      lg:basis-1/4
      pr-2
			pb-4
      /**/;
	}

	.projects .title {
		@apply /**/
      block
      font-semibold
      /**/;
	}

	.projects .client {
		@apply /**/
      block
      opacity-50
      /**/;
	}
</style>
