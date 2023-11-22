import { describe, expect, it } from 'vitest';
import Track from './track';

describe('track', () => {
  it('sortClips', () => {
    const track = new Track('test');
    track.addClips(
      [9, 60, { active: true }],
      [9, 11, { opacity: 1.0 }],
      [11, 12, { opacity: 1.0 }, { opacity: 0.5 }]
    );

    expect(track.state(0.0)).toEqual({});
    expect(track.state(9.0)).toEqual({ active: true, opacity: 1.0 });
    expect(track.state(10.0)).toEqual({ active: true, opacity: 1.0 });
    expect(track.state(11.0)).toEqual({ active: true, opacity: 1.0 });
    expect(track.state(11.5)).toEqual({ active: true, opacity: 0.75 });
    expect(track.state(12.0)).toEqual({ active: true, opacity: 0.5 });
    expect(track.state(15.0)).toEqual({ active: true, opacity: 0.5 });
    expect(track.state(60.0)).toEqual({ active: true, opacity: 0.5 });
  });
});
