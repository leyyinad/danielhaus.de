<script lang="ts">
	import { Engine } from '$lib/engine';
	import { onMount } from 'svelte';

	if (typeof window != 'undefined' && typeof document != 'undefined') {
		const init = () => {
			const positions = [
				// Front face
				-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

				// Back face
				-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

				// Top face
				-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

				// Bottom face
				-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

				// Right face
				1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

				// Left face
				-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0
			];

			const numComponents = 3;

			const indices = [
				0,
				1,
				2,
				0,
				2,
				3, // front
				4,
				5,
				6,
				4,
				6,
				7, // back
				8,
				9,
				10,
				8,
				10,
				11, // top
				12,
				13,
				14,
				12,
				14,
				15, // bottom
				16,
				17,
				18,
				16,
				18,
				19, // right
				20,
				21,
				22,
				20,
				22,
				23 // left
			];

			const canvas = document.getElementById('canvas');
			if (canvas != null && canvas instanceof HTMLCanvasElement) {
				const engine = new Engine(window, canvas, positions, indices);
				engine.run();
			}
		};

		onMount(init);
	}
</script>

<canvas id="canvas"></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 65.25vw;
		/* background: rgba(0, 0, 0, 0.5); */
	}
</style>
