import { describe, expect, test } from 'vitest';
import { blinkEveryOther } from './generators';
import type { LedAnimComponentConfig } from './types';

describe('generators test', () => {
	describe('blink test', () => {
		test.each([
			{ x: 0, y: 0, t: 0, expected: 0.0 },
			{ x: 1, y: 0, t: 0, expected: 1.0 },
			{ x: 0, y: 0, t: 1, expected: 1.0 },
			{ x: 1, y: 0, t: 1, expected: 0.0 }
		])('blinkEveryOther($x, $y, t=$t) -> $expected', ({ x, y, t, expected }) => {
			expect(blinkEveryOther(x, y, { t } as LedAnimComponentConfig)).toBe(expected);
		});
	});
});
