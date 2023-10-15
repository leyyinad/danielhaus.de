import type Clip from "./clip";
import Track from "./track";

export default class Timeline {
  public tracks: { [key: string]: Track; } = {};

  public init() {
    for (const track of Object.values(this.tracks)) {
      track.sort();
    }
  }

  public addTrack(key: string = ""): Track {
    if (!key) {
      key = `track-${this.tracks.length}`;
    }

    while (key in this.tracks) {
      key += "-copy";
    }

    const track = new Track(key);
    this.tracks[key] = track;
    return track;
  }

  public addClip(track: string, start: number, length: number, state: object = {}): Clip {
    return this.track(track)!.addClip(start, length, state);
  }

  public track(key: string): Track | undefined {
    return this.tracks[key];
  }

  state(time: number) {
    const state: { [key: string]: object; } = {};

    for (const trackName in this.tracks) {
      const track = this.tracks[trackName];
      state[trackName] = track.state(time);
    }

    return state;
  }
}
