<script lang="ts">
	import City from '$lib/city/index';
	import { onDestroy, onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	if (typeof window != 'undefined' && typeof document != 'undefined') {
		let city: City | undefined;

		const init = () => {
			if (canvas != null && canvas instanceof HTMLCanvasElement) {
				city = new City(canvas);

				window.addEventListener('resize', resize);
				window.requestAnimationFrame((t) => city!.engine.loop(t));

				resize();
			}
		};

		const resize = () => city?.engine.resize();

		const cleanup = () => {
			window.removeEventListener('resize', resize);
			city = undefined;
		};

		onMount(init);
		onDestroy(cleanup);
	}
</script>

<canvas id="canvas" bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
