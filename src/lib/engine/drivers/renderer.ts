import type Engine from "../engine";

export default interface Renderer {
  engine: Engine;
  init(): void;
  viewport(x: number, y: number, width: number, height: number): void;
  clear(): void;
  render(): void;
}
