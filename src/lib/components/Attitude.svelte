<script lang="ts">
  import InViewport from './widgets/InViewport.svelte';
  import Tree from './widgets/Tree.svelte';

  let tree: Tree;
  // $: console.log(tree);
</script>

<section>
  <article>
    <h4>Philosophie &amp; Haltung</h4>

    <div class="columns-2">
      <div class="column">
        <p>
          Vertrauenswürdigkeit, Qualität und Effizienz sind meine Leitprinzipien. Es ist mir
          besonders wichtig, neben den Erwartungen meiner Kunden auch die eigenen Erwartungen an
          meine Arbeitsergebnisse stetig zu erfüllen und regelmäßig zu übertreffen. Schnelle
          Ergebnisse machen einen Unterschied. Deswegen investiere ich viel Zeit und Energie in
          Werkzeuge und Automatisierung.
        </p>

        <p>
          Jedes Projekt behandle ich mit größtmöglicher Sorgfalt und Verantwortung und kommuniziere
          dabei offen und proaktiv. Meine Kunden schätzen meine Zuverlässigkeit, meinen Weitblick
          und meine Loyalität. Ich bin ein verlässlicher Partner, der auch kurzfristigen Erfolg, vor
          allem aber langfristige, nachhaltige Ergebnisse anstrebt.
        </p>
      </div>
    </div>
  </article>

  <InViewport on:enter={() => tree.start()} on:leave={() => tree.pause()}>
    <Tree slot="inViewport" bind:this={tree} />
  </InViewport>
</section>

<style lang="postcss">
  section {
    @apply relative
      overflow-hidden
      border-y-2
      border-black
      bg-violetshirt-950
      bg-gradient-to-br
			from-violetshirt-950
      to-black
      py-8
      text-violetshirt-400
      drop-shadow-2xl;
  }

  article {
    @apply container
			prose
			prose-invert
			relative
			z-10
			mx-auto
      max-w-screen-lg
      hyphens-auto
			px-6
			pb-96
			pt-2
      text-base
			sm:text-xl
			lg:max-w-5xl
			lg:pb-2;
  }

  h4 {
    @apply mb-0
			mt-5
			text-3xl
			font-black
      md:text-4xl;
  }

  .columns-2 {
    @apply grid
			gap-4
			lg:grid-cols-2;
  }

  .column:not(:first-child) {
    @apply -mt-8
      md:mt-0;
  }
</style>
