<script>
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import '$lib/css/styles.css';
</script>

<div class="layout">
  <Header />

  <main>
    <slot />
  </main>

  <Footer />
</div>
