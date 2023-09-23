import type { LedAnimGeneratorComponent, LedAnimModifierComponent } from "./types";

export const compose = (
  a: LedAnimModifierComponent,
  b: LedAnimModifierComponent,
): LedAnimModifierComponent => (
  generator: LedAnimGeneratorComponent
) => a(b(generator));
