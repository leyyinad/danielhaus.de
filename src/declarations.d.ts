/// <reference types="vite/client" />

declare module '*.glsl';
declare module '*.frag';
declare module '*.vert';

declare module 'bunny' {
	export const positions: Array<[number, number, number]>;
	export const cells: Array<[number, number, number]>;
}
