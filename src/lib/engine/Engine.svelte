<script lang="ts">
	import { Engine } from '$lib/engine';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	// import bunny from 'bunny';
	import cube from './cube';

	type Mesh = {
		positions: [number, number, number][];
		cells: [number, number, number][];
	};

	if (typeof window != 'undefined' && typeof document != 'undefined') {
		let engine: Engine | undefined;

		// const mesh = bunny;
		const mesh = cube as Mesh;

		const init = () => {
			const canvas = document.getElementById('canvas');
			if (canvas != null && canvas instanceof HTMLCanvasElement) {
				engine = new Engine(window, canvas, mesh.positions, mesh.cells);
				engine.init();
				engine.start();
			}
		};

		const cleanup = () => {
			engine?.cleanup();
			engine = undefined;
		};

		onMount(init);
		afterUpdate(() => {
			cleanup();
			init();
		});
		onDestroy(cleanup);

		if (import.meta.hot) {
			import.meta.hot.dispose((data) => {
				console.log('dispose <-', data);
				cleanup();
			});
		}
	}
</script>

<canvas id="canvas"></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
