import type EngineContext from '../context';

export default interface RenderDriver {
  engineContext: EngineContext;
  isSupported(): boolean;
  init(): void;
  viewport(x: number, y: number, width: number, height: number): void;
  resize(): void;
  clear(): void;
  render(): void;
  run(callback: CallableFunction): void;
  loop(callback: CallableFunction): void;
}
