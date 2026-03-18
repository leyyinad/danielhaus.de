<section>
  <article>
    <h4>Person</h4>

    <div class="columns-2">
      <div class="column">
        <p>
          Mein Name ist Daniel Haus. Ich bin <strong>Senior Softwareentwickler</strong>
          und IT-Generalist aus dem Rhein-Main-Gebiet. Als breitgefächerter Spezialist mit Fokus auf
          <strong>benutzerfreundliche</strong>
          und <strong>zuverlässige</strong>, durchdachte Software habe ich in über 25 Jahren viele
          erfolgreiche Anwendungen realisiert.
        </p>
      </div>

      <div class="column">
        <p>
          Meine Klienten umfassen bekannte Namen und Marken aus den Bereichen IT, Medien und TV,
          Werbung, Versicherung, Banken und Finanzen, Pharma und Medizin, Unternehmensberatung,
          High-End Audio, Automotive, Gesundheit, Bildung sowie dem öffentlichen Sektor.
        </p>
      </div>
    </div>
  </article>
</section>

<style>
  section {
    background-color: black;
    padding: 2rem 0;
  }

  article {
    margin-right: auto;
    margin-left: auto;
    padding: 0.5rem 1.5rem;
    width: var(--container-width);
    max-width: 1024px;
    color: white;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    hyphens: auto;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    @media (min-width: 1024px) {
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
  }

  .column:not(:first-child) {
    margin-top: -2rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
</style>
