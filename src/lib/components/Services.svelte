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

<style>
  section {
    background-image: url('$lib/images/circuit.png');
    background-size: cover;
    background-color: var(--kashmirgrey-950);
    color: white;
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
  }

  h4 {
    margin: 0 0 2rem;
    font-weight: 900;
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;

    @media (min-width: 768px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    + * {
      margin-top: 0;
    }
  }

  ul {
    margin: 0;
    padding: 0;

    @media (min-width: 768px) {
      columns: 2;
    }

    > li {
      position: relative;
      break-inside: avoid-column;
      padding-left: 1.25rem;
      list-style: none;

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
    }
  }
</style>
