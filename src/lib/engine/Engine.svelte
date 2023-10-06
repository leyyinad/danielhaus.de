<script lang="ts">
	import City from '$lib/city';
	import { onDestroy, onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	if (typeof window != 'undefined' && typeof document != 'undefined') {
		let city: City | undefined;

		const init = () => {
			if (canvas != null && canvas instanceof HTMLCanvasElement) {
				city = new City(canvas.getContext('webgl2')!);

				window.addEventListener('resize', resize);
				window.requestAnimationFrame(loop);

				resize();
			}
		};

		const loop = (time: DOMHighResTimeStamp) => {
			if (city != null) {
				city!.engine.update(time);
				city!.engine.render();

				window.requestAnimationFrame(loop);
			}
		};

		const resize = () => {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			const r = window.devicePixelRatio;

			canvas.width = w * r;
			canvas.height = h * r;

			city!.engine.viewport(0, 0, w * r, h * r);
		};

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
