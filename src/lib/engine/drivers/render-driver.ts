import type Engine from '../engine';

export default interface RenderDriver {
	engine: Engine;
	init(): void;
	viewport(x: number, y: number, width: number, height: number): void;
	resize(): void;
	clear(): void;
	render(): void;
	run(callback: FrameRequestCallback): void;
	loop(callback: CallableFunction): void;
}
