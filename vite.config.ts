import { sveltekit } from '@sveltejs/kit/vite';
import { glslify } from 'vite-plugin-glslify';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), glslify()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
