import Transform from '$lib/engine/components/transform';
import { mat4, quat, vec3 } from 'gl-matrix';
import { describe, expect, it } from 'vitest';

describe('transform', () => {
  it('initializes', () => {
    const transform = new Transform();

    const zero = vec3.create();
    const one = vec3.fromValues(1.0, 1.0, 1.0);
    const quatZero = quat.create();

    expect(transform.position).toEqual(zero);
    expect(transform.localPosition).toEqual(zero);
    expect(transform.rotation).toEqual(quatZero);
    expect(transform.scale).toEqual(one);

    expect(transform.matrix).toEqual(mat4.create());
  });

  it('scales', () => {
    const transform = new Transform();

    transform.scale = [2.0, 2.0, 2.0];

    expect(transform.scale).toEqual(vec3.fromValues(2.0, 2.0, 2.0));
    expect(transform.matrix).toEqual(
      mat4.fromValues(
        2.0,
        0.0,
        0.0,
        0.0,
        0.0,
        2.0,
        0.0,
        0.0,
        0.0,
        0.0,
        2.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0
      )
    );
  });
});
