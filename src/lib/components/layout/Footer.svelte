<script lang="ts">
  import SquarePattern from '../widgets/SquarePattern.svelte';

  const decodeLink = (event: Event) => {
    const target = event.currentTarget as HTMLAnchorElement;

    let link = ['before', 'after']
      .map((s) => window.getComputedStyle(target, `:${s}`).content ?? '')
      .map((s) => s.replaceAll('"', ''))
      .join(target.textContent ?? '')
      .replaceAll(/\s+/gi, '');

    if (target.classList.contains('phone')) {
      link = link.replace(/^\+/, '00');
      link = `tel:${link}`;
    } else if (target.classList.contains('email')) {
      link = `mailto:${link}`;
    }

    target.href = link;
  };
</script>

<footer>
  <div>
    <div class="imprint">
      <h4>Impressum</h4>

      <p>
        <strong>Daniel Haus</strong><br />
        IT-Beratung &amp; Softwareentwicklung
      </p>

      <div class="columns">
        <div class="editor">
          <h5>Inhaltlich verantwortlich</h5>

          <span>Daniel Haus</span>
          <address>
            Limburger Str. 36<br />
            65510 Idstein
          </address>

          <h5>USt-IdNr.</h5>
          <span>DE365921448</span>
        </div>

        <div class="kontakt">
          <h5>Kontakt</h5>
          <p>
            <span>E-Mail</span>
            <a
              href="/"
              onfocus={decodeLink}
              onmouseover={decodeLink}
              class="no-spam email"
              aria-label="E-Mail-Adresse">@</a
            ><br />
            <span>Telefon</span>
            <a
              href="/"
              onfocus={decodeLink}
              onmouseover={decodeLink}
              class="no-spam phone"
              aria-label="Telefonnummer">&nbsp;</a
            >
          </p>
        </div>

        <div class="links">
          <ul>
            <li>
              <a href="https://github.com/leyyinad" target="_blank" rel="noopener"
                ><strong>github</strong>.com/leyyinad</a
              >
            </li>
            <li>
              <a href="https://gitlab.com/leyyinad" target="_blank" rel="noopener"
                ><strong>gitlab</strong>.com/leyyinad</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <SquarePattern />
</footer>

<div class="footnote">
  <p>Es gelten die Regeln des gesunden Menschenverstands.</p>
</div>

<style>
  .no-spam.email::before {
    content: 'd';
  }

  .no-spam.email::after {
    content: 'danielhaus.de';
  }

  .no-spam.phone::before {
    content: '+49 170';
  }

  .no-spam.phone::after {
    content: '9621919';
  }

  @media (min-width: 768px) {
    .columns {
      display: flex;
    }
  }

  .columns > div {
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  footer {
    background-color: black;
  }

  footer > div {
    margin-right: auto;
    margin-left: auto;
    padding: 3rem 1.5rem;
    width: var(--container-width);
    max-width: 1024px;
  }

  .footnote {
    background-color: var(--bluebirth-950);
    padding: 1.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .footnote p {
    color: var(--bluebirth-400);
    font-weight: 600;
  }

  .imprint {
    color: var(--bluebirth-100);
  }

  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 900;
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  h5 {
    margin-top: 1.5rem;
    margin-bottom: 0;
    font-size: inherit;
  }

  p {
    margin: 0;
    padding: 0;
  }

  p,
  .editor {
    color: var(--kashmirgrey-300);
    font-weight: 300;
  }

  h5,
  strong {
    color: var(--kashmirgrey-100);
    font-weight: 700;
  }

  address {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    font-style: normal;
  }

  .kontakt p span {
    display: inline-block;
    width: 4rem;
    color: var(--kashmirgrey-500);
    white-space: nowrap;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .links {
    margin-top: 1.5rem;

    @media (min-width: 768px) {
      margin-top: 3rem;
    }

    > ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      color: var(--kashmirgrey-300);
    }
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
