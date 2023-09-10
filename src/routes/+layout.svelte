<script>
	import Header from '$lib/Header.svelte';
	import '../app.css';
</script>

<div class="layout">
	<Header />

	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style lang="postcss">
</style>
