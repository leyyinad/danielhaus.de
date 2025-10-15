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
          besonders wichtig neben den Erwartungen meiner Klienten auch die eigenen Erwartungen an
          meine Arbeitsergebnisse stetig zu erfüllen und regelmäßig zu übertreffen. Schnelle
          Ergebnisse machen einen Unterschied. Daher investiere ich viel Zeit und Energie in
          Werkzeuge und Automatisierung.
        </p>

        <p>
          Jedes Projekt behandle ich mit größtmöglicher Sorgfalt und Verantwortung. Ich kommuniziere
          offen und proaktiv. Meine Klienten schätzen meine Zuverlässigkeit, meinen Weitblick und
          meine Loyalität. Ich bin ein verlässlicher Partner, der neben kurzfristigen Lösungen, vor
          allem gemeinsamen langfristigen und nachhaltigen Erfolg anstrebt.
        </p>
      </div>
    </div>
  </article>

  <InViewport enter={() => tree.start()} leave={() => tree.pause()}>
    <Tree bind:this={tree} />
  </InViewport>
</section>

<style>
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
    font-size: 1rem;
    line-height: 1.5rem;
    hyphens: auto;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    @media (min-width: 1024px) {
      padding-bottom: 0.5rem;
      max-width: 64rem;
    }
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
  }

  p {
    margin: 1.5rem 0;
  }

  .columns-2 {
    display: grid;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .column:not(:first-child) {
    margin-top: -2rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
</style>
