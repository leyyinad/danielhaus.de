<section>
  <article>
    <h4>Dienstleistungen</h4>

    <ul>
      <li><strong>Effiziente</strong> und <strong>effektive</strong> IT-Lösungen</li>
      <li><strong>Ganzheitliche</strong>, strategische Perspektive</li>
      <li><strong>Kreativität</strong>, Stil und Erfahrung</li>
      <li>Schnelle, <strong>nachhaltige</strong> Softwareentwicklung</li>
      <li><strong>UI/UX</strong>, 2D/3D Grafikprogrammierung</li>
      <li>Audiovisuelle, <strong>interaktive</strong> Anwendungen</li>
      <li><strong>Cloud-native</strong>, Web, Mobile, Desktop, Server</li>
      <li>CMS-Systeme, APIs, Datenbanken, Python, PHP, HTML5, JS/TS, CSS, WebGL</li>
      <li><strong>IT-Security</strong> und <strong>Datenschutz/DSGVO</strong> tiefenintegriert</li>
    </ul>
  </article>
</section>

<style lang="postcss">
  section {
    @apply bg-[rgb(46,21,45)]
      text-white
      drop-shadow-xl;
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
      pl-5;
  }

  ul > li::before {
    @apply absolute
      left-0
      top-2.5
      block
      h-2
      w-2
      rounded-full
      bg-white
      opacity-25;

    content: '';
  }
</style>
