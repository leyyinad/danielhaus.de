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
      /**/
      bg-bluebirth-950
      bg-gradient-to-br
      from-bluebirth-950
      to-black
      bg-cover
			bg-fixed
			py-6
      text-bluebirth-50;

		background-image: url($lib/images/holz.jpg);
	}

	article {
		@apply /**/
      /**/
		 	container
			mx-auto
      max-w-screen-lg
      text-center;

		text-shadow: 1px 1px 3px black;
	}

	h4 {
		@apply /**/
      /**/
      mb-3
      text-3xl
      font-semibold
		  opacity-80;
	}

	h5 {
		@apply /**/
      /**/
			mb-8
			mt-3
      text-sm
      font-semibold
		  opacity-40;
	}

	.projects {
		@apply /**/
      /**/
      flex
      flex-row
      flex-wrap
      px-6
			text-left
      text-sm;
	}

	.projects li {
		@apply /**/
      /**/
      basis-1/2
      pb-4
      pr-2
      sm:basis-1/2
			md:basis-1/3
      lg:basis-1/4;
	}

	.projects .title {
		@apply /**/
      /**/
      block
      font-semibold;
	}

	.projects .client {
		@apply /**/
      /**/
      block
      opacity-50;
	}
</style>
