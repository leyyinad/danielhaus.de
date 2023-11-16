import type { LedAnimAnimatableValue, LedAnimComponentConfig } from './types';

export const ON = 1.0;
export const OFF = 0.0;
export const toggle = (state: number) => ON - state;

export function animate<T>(
	defaults: T,
	config: T | undefined,
	componentConfig: LedAnimComponentConfig,
	animatable: [keyof T]
): { [_key in keyof T]: number } {
	const cfg = { ...defaults, ...config } as T;

	for (const key of animatable) {
		const value: LedAnimAnimatableValue = cfg[key] as LedAnimAnimatableValue;
		if (typeof value === 'function') {
			cfg[key] = value(componentConfig.t, componentConfig) as T[keyof T];
		}
	}

	return cfg as { [key in keyof T]: number };
}
