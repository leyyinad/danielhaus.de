<section>
  <article>
    <h4>Dienstleistungen</h4>

    <ul>
      <li><strong>Effiziente</strong> und <strong>effektive</strong> IT-Lösungen</li>
      <li><strong>Ganzheitliche</strong>, strategische Perspektive</li>
      <li><strong>Kreativität</strong>, Stil und Erfahrung</li>
      <li>Schnelle, <strong>nachhaltige</strong> Softwareentwicklung</li>
      <li><strong>IT-Security</strong> und <strong>Datenschutz</strong> (DSGVO, BDSG)</li>
      <li><strong>UI/UX</strong>, 2D/3D Grafikprogrammierung</li>
      <li>Audiovisuelle, <strong>interaktive</strong> Anwendungen</li>
      <li><strong>Cloud-native</strong>, Web, Mobile, Desktop, Server</li>
      <li>CMS-Systeme, APIs, Datenbanken</li>
      <li>DevSecOps, CI/CD, TDD</li>
      <li><strong>Python</strong>, <strong>PHP</strong>, HTML5, JS/TS, CSS, WebGL</li>
      <li><strong>Unity</strong>, <strong>Godot</strong></li>
      <li>
        <strong>Affinity Suite</strong>, <strong>Pixelmator Pro</strong>, Apple
        <strong>Logic Pro</strong>
      </li>
    </ul>
  </article>
</section>

<style lang="postcss">
  section {
    @apply bg-kashmirgrey-950
      bg-cover
      text-white;

    background-image: url(/circuit.png);
  }

  article {
    @apply container
      mx-auto
			max-w-screen-lg
			px-6
      py-14
      sm:text-xl;
  }

  h4 {
    @apply mb-8
      text-3xl
      font-black
      md:text-4xl;
  }

  ul {
    @apply md:columns-2;
  }

  ul > li {
    @apply relative
      break-inside-avoid-column
      pl-5
      before:absolute
      before:left-0
      before:top-2.5
      before:block
      before:h-2
      before:w-2
      before:rounded-full
      before:bg-white
      before:opacity-25;
  }
</style>
