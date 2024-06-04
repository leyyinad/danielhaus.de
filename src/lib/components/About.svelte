<section>
  <article>
    <h4>Person</h4>

    <div class="columns-2">
      <div class="column">
        <p>
          Mein Name ist Daniel Haus. Ich bin <strong>IT-Berater</strong> und
          <strong>Softwareentwickler</strong> aus dem Rhein-Main-Gebiet. Als breitgefächerter
          Spezialist mit Fokus auf <strong>benutzerfreundliche</strong> und
          <strong>zuverlässige</strong>, durchdachte Software habe ich in den letzten 25 Jahren
          viele erfolgreiche Anwendungen realisiert.
        </p>
      </div>

      <div class="column">
        <p>
          Meine Kunden umfassen bekannte Namen und Marken aus den Bereichen IT, Medien und TV,
          Werbung, Versicherung, Banken und Finanzen, Pharma und Medizin, Unternehmensberatung,
          High-End Audio, Automotive, Gesundheit, Bildung sowie dem öffentlichen Sektor.
        </p>
      </div>
    </div>
  </article>
</section>

<style lang="postcss">
  section {
    @apply bg-black py-8;
  }

  article {
    @apply container prose prose-invert mx-auto max-w-screen-lg hyphens-auto px-6 py-2 text-base sm:text-xl lg:max-w-5xl;
  }

  h4 {
    @apply mb-0 mt-5 text-3xl font-black md:text-4xl;
  }

  .columns-2 {
    @apply grid gap-4 md:grid-cols-2;
  }

  .column:not(:first-child) {
    @apply -mt-8 md:mt-0;
  }
</style>
