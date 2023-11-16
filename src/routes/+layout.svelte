<script>
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import '../app.css';
</script>

<div class="layout">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>
