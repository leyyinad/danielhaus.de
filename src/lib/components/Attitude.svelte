<script lang="ts">
</script>

<section>
  <article>
    <h4>Philosophie &amp; Haltung</h4>

    <div class="columns-2">
      <div class="column">
        <p>
          Vertrauenswürdigkeit, Qualität und Effizienz sind meine Leitprinzipien. Es ist mir
          besonders wichtig, neben den Erwartungen meiner Kunden auch die eigenen Erwartungen an
          meine Arbeitsergebnisse stetig zu erfüllen und regelmäßig zu übertreffen.
        </p>

        <p>
          Schnelle Ergebnisse machen einen Unterschied. Deswegen investiere ich überdurchschnittlich
          in Tools und Automatisierung.
        </p>

        <p>
          Jedes Projekt behandle ich mit größtmöglicher Sorgfalt und Verantwortung und kommuniziere
          dabei offen und proaktiv. Meine Kunden schätzen meine Zuverlässigkeit, meinen Weitblick
          und meine Loyalität.
        </p>

        <p>
          Ich bin ein verlässlicher Partner, der auch kurzfristigen Erfolg, vor allem aber
          langfristige, nachhaltige Ergebnisse anstrebt.
        </p>
      </div>
    </div>
  </article>
</section>

<style lang="postcss">
  section {
    @apply relative
      overflow-hidden
      border-y-2
      border-black
      bg-violetshirt-950
      py-8
			text-violetshirt-400
      drop-shadow-2xl;
  }

  article {
    @apply container
			prose
			prose-invert
			mx-auto
			max-w-screen-lg
			hyphens-auto
			px-6
			py-2
			text-base
			sm:text-xl
			lg:max-w-5xl;
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
			md:grid-cols-2;
  }

  .column:not(:first-child) {
    @apply -mt-8
			md:mt-0;
  }
</style>
