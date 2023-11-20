export type LedAnimComponentConfig = {
  width: number;
  height: number;
  time: number;
  t: number;
  i: number;
  start: number;
};

export type LedAnimGeneratorComponent = (
  x: number,
  y: number,
  config: LedAnimComponentConfig
) => number;

export type LedAnimModifierComponent = (
  component: LedAnimGeneratorComponent
) => LedAnimGeneratorComponent;

export type LedAnimComponentComposer = (
  ...composers: LedAnimGeneratorComponent[]
) => LedAnimGeneratorComponent;

export type LedAnimAnimataableValueFunction = (t: number, config: LedAnimComponentConfig) => number;

export type LedAnimAnimatableValue = LedAnimAnimataableValueFunction | number;
