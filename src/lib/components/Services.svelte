<section>
  <article>
    <h4>Dienstleistungen</h4>

    <ul>
      <li><strong>Effiziente</strong> und <strong>effektive</strong> IT-Lösungen</li>
      <li><strong>Ganzheitliche</strong>, strategische Perspektive</li>
      <li><strong>Kreativität</strong>, Stil und Erfahrung</li>
      <li>Schnelle, <strong>nachhaltige</strong> Softwareentwicklung</li>
      <li><strong>IT-Security</strong> und <strong>Datenschutz</strong> (DSGVO, BDSG)</li>
      <li><strong>UX/UI</strong>, 2D/3D Grafikprogrammierung</li>
      <li>Audiovisuelle, <strong>interaktive</strong> Anwendungen</li>
      <li><strong>Cloud-native</strong>, Web, Mobile, Desktop, Server</li>
      <li>CMS-Systeme, APIs, Datenbanken</li>
      <li>DevSecOps, CI/CD, TDD</li>
      <li><strong>Python</strong>, <strong>PHP</strong>, HTML5, JS/TS, CSS, WebGL</li>
      <li>
        Unix/Linux, <strong>Vim</strong>, <strong>Git</strong>, Zsh/Bash, <strong>Docker</strong>,
        <strong>K8s</strong>
      </li>
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
    background-image: url('$lib/images/circuit.png');
    background-size: cover;
    background-color: var(--kashmirgrey-950);
    /* background: var(--kashmirgrey-950) url('$lib/images/circuit.png') cover;*/
    color: white;

    /*
    @apply bg-kashmirgrey-950
      bg-cover
      text-white;
*/

    /* background-image: url(/circuit.png);*/
  }

  article {
    margin: 0 auto;
    padding: 3.5rem 1.5rem;
    width: var(--container-width);
    max-width: 1024px;

    @media (min-width: 640px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    /*
    @apply container
      mx-auto
			max-w-screen-lg
			px-6
      py-14
      sm:text-xl;
      */
  }

  h4 {
    margin-bottom: 2rem;
    font-weight: 900;
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;

    @media (min-width: 768px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    /*
    @apply mb-8
      text-3xl
      font-black
      md:text-4xl;
      */
  }

  ul {
    @media (min-width: 768px) {
      columns: 2;
    }
    /*@apply md:columns-2;*/
  }

  ul > li {
    position: relative;
    break-inside: avoid-column;
    padding-left: 1.25rem;

    &::before {
      display: block;
      position: absolute;
      top: 0.625rem;
      left: 0;
      opacity: 0.25;
      border-radius: 50%;
      background-color: white;
      width: 0.5rem;
      height: 0.5rem;
      content: '';
    }

    /*
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
      */
  }
</style>
