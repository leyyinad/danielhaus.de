<script lang="ts">
  import projects from '../projects.json';
</script>

<section>
  <article>
    <h4>Projekte</h4>

    <ul class="projects">
      {#each projects as project}
        <li>
          <span class="title">
            {#if project.url}
              <a href={project.url} target="_blank" rel="external noopener">{project.title}</a>
            {:else}
              {project.title}
            {/if}
          </span>
          <span class="client">{project.client}</span>
        </li>
      {/each}
    </ul>
  </article>
</section>

<style>
  section {
    background-image: url('$lib/images/holz.jpg');
    background-size: cover;
    background-color: #220d08;
    color: var(--bluebirth-50);
  }

  article {
    margin-right: auto;
    margin-left: auto;
    padding: 3.5rem 1.5rem;
    width: var(--container-width);
    max-width: 1024px;
    text-shadow: 1px 1px 3px black;
  }

  h4 {
    opacity: 0.8;
    filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 900;
    font-size: 1.875rem;
    line-height: 2.25rem;

    @media (min-width: 768px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.25rem;
    list-style: none;
  }

  .projects li {
    flex-basis: 100%;
    padding-right: 0.5rem;
    padding-bottom: 1rem;

    @media (min-width: 380px) {
      flex-basis: 50%;
    }

    @media (min-width: 640px) {
      flex-basis: 50%;
    }

    @media (min-width: 768px) {
      flex-basis: 33.333333%;
    }

    @media (min-width: 1024px) {
      flex-basis: 25%;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .projects .title {
    display: block;
    font-weight: 600;
  }

  .projects .client {
    display: block;
    opacity: 0.5;
  }
</style>
