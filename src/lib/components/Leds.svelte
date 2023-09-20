<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let width = 8;
	export let height = 8;
	export let fn = (t: number, x: number, y: number) => 0;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	let count = width * height;
	let pw = 8.0;
	let ph = 8.0;

	let running = false;

	const loop = (t: number) => {
		if (!running) return;

		for (let i = 0; i < count; i++) {
			const x = i % width;
			const y = Math.floor(i / width);

			// console.log(x, y);
			// const c = fn(t, x, y);
			// const c = Math.floor(x % 2) === 0 ? 1.0 : 0.0;
			const c = x % 2;

			context.clearRect(0, 0, canvas.width, canvas.height);

			context.fillStyle = `rgba(255, 255, 255, ${c})`;
			context.fillRect(x * pw, y * ph, pw, ph);
		}

		requestAnimationFrame(loop);
	};

	onMount(() => {
		context = canvas.getContext('2d')!;
		canvas.width = width * pw;
		canvas.height = height * ph;

		running = true;
		requestAnimationFrame(loop);
	});

	onDestroy(() => {
		running = false;
	});
</script>

<canvas bind:this={canvas}></canvas>

<style lang="postcss">
	canvas {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
