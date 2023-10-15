import Clip from "./clip";

export default class Track {
  public clips: Clip[] = [];

  constructor(public name: string) { }

  public addClip(start: number, length: number, state: object = {}): Clip {
    const clip = new Clip(start, length, state);
    this.clips.push(clip);
    return clip;
  }

  public sort() {
    this.clips.sort((a, b) => {
      const d = b.end - a.end;
      return d == 0.0 ? b.start - a.start : d;
    });
  }

  public state(time: number) {
    const state = {};

    for (const clip of this.clips) {
      if (time >= clip.start && time < clip.end) {
        Object.assign(state, clip.state);
      }
    }

    return state;
  }
}
