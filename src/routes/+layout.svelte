<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import '$lib/css/styles.css';
  import { commit, version } from '$lib/version';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <meta name="version" content={version} />
  <meta name="git-commit" content={commit} />
</svelte:head>

<Header />

<main>
  {@render children?.()}
</main>

<Footer />
