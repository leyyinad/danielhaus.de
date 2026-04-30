<script lang="ts">
  import About from '$lib/components/About.svelte';
  import Attitude from '$lib/components/Attitude.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Services from '$lib/components/Services.svelte';
  import OpenSource from '$lib/components/OpenSource.svelte';
  import CodeSnippet from '$lib/components/widgets/CodeSnippet.svelte';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import linkedData from './linked-data.json';

  const title = 'Daniel Haus';
  const description = '"Software Developer in Idstein"';
</script>

<svelte:head>
  <title>Daniel Haus — Softwareentwickler</title>
  <meta name="description" content={description} />

  <meta name="thumbnail" content="https://danielhaus.de/static/favicon.png" />

  <meta property="og:url" content="https://danielhaus.de" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://danielhaus.de/poster.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="danielhaus.de" />
  <meta property="twitter:url" content="https://danielhaus.de" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://danielhaus.de/poster.png" />
</svelte:head>

<Hero />
<About />
<Services />
<CodeSnippet />
<Attitude />
<Projects />
<OpenSource />

<JsonLd {linkedData} />
