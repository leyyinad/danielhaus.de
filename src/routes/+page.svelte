<script lang="ts">
  import About from '$lib/components/About.svelte';
  import Attitude from '$lib/components/Attitude.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Services from '$lib/components/Services.svelte';
  import OpenSource from '$lib/components/OpenSource.svelte';
  import CodeSnippet from '$lib/components/widgets/CodeSnippet.svelte';
</script>

<svelte:head>
  <title>Daniel Haus — IT-Berater und Softwareentwickler</title>
  <meta
    name="description"
    content="Mein Name ist Daniel Haus. Ich bin IT-Berater und Softwareentwickler aus dem Rhein-Main-Gebiet."
  />

  <meta property="og:url" content="https://danielhaus.de" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Daniel Haus" />
  <meta
    property="og:description"
    content="IT-Berater und Softwareentwickler im Rhein-Main-Gebiet."
  />
  <meta property="og:image" content="https://danielhaus.de/poster.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="danielhaus.de" />
  <meta property="twitter:url" content="https://danielhaus.de" />
  <meta name="twitter:title" content="Daniel Haus" />
  <meta
    name="twitter:description"
    content="IT-Berater und Softwareentwickler im Rhein-Main-Gebiet."
  />
  <meta name="twitter:image" content="https://danielhaus.de/poster.png" />
</svelte:head>

<Hero />
<About />
<Services />
<CodeSnippet />
<Attitude />
<Projects />
<OpenSource />
