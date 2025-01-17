<script lang="ts">
  import InViewport from './widgets/InViewport.svelte';
  import Tree from './widgets/Tree.svelte';

  let tree: Tree;
</script>

<section>
  <article>
    <h4>Philosophie &amp; Haltung</h4>

    <div class="columns-2">
      <div class="column">
        <p>
          Vertrauenswürdigkeit, Qualität und Effizienz sind meine Leitprinzipien. Es ist mir
          besonders wichtig neben den Erwartungen meiner Kunden auch die eigenen Erwartungen an
          meine Arbeitsergebnisse stetig zu erfüllen und regelmäßig zu übertreffen. Schnelle
          Ergebnisse machen einen Unterschied. Daher investiere ich viel Zeit und Energie in
          Werkzeuge und Automatisierung.
        </p>

        <p>
          Jedes Projekt behandle ich mit größtmöglicher Sorgfalt und Verantwortung. Ich kommuniziere
          offen und proaktiv. Meine Kunden schätzen meine Zuverlässigkeit, meinen Weitblick und
          meine Loyalität. Ich bin ein verlässlicher Partner, der neben kurzfristigen Lösungen, vor
          allem gemeinsamen langfristigen und nachhaltigen Erfolg anstrebt.
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
    position: relative;
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    background-image: linear-gradient(to bottom right, var(--violetshirt-950), black);
    background-color: var(--violetshirt-950);
    padding-top: 2rem;
    padding-bottom: 2rem;
    overflow: hidden;
    color: var(--violetshirt-400);

    /*
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
      */
  }

  article {
    position: relative;
    z-index: 10;
    margin-right: auto;
    margin-left: auto;
    padding: 0.5rem 1.5rem 24rem;
    width: var(--container-width);
    max-width: 1024px;
    color: white;
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
    hyphens: auto;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    @media (min-width: 1024px) {
      padding-bottom: 0.5rem;
      max-width: 64rem;
    }

    /*
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
      */
  }

  h4 {
    margin-top: 1.25rem;
    margin-bottom: 0;
    font-weight: 900;
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;

    @media (min-width: 768px) {
      font-size: 2.25rem /* 36px */;
      line-height: 2.5rem /* 40px */;
    }

    /* @apply mb-0 mt-5 text-3xl font-black md:text-4xl; */
  }

  p {
    margin: 1.5rem 0;

    strong {
      font-weight: 600;
    }
  }

  .columns-2 {
    display: grid;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /* @apply grid gap-4 lg:grid-cols-2; */
  }

  .column:not(:first-child) {
    margin-top: -2rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }

    /* @apply -mt-8 md:mt-0; */
  }
</style>
