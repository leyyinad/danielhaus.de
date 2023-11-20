import type Clip from './clip';
import type { ClipDesc, ClipState } from './clip';
import Track from './track';

export type TimelineTrackState = { [key: string]: object };
export type TimelineState = { [key: string]: TimelineTrackState };

export default class Timeline {
  public tracks: { [key: string]: Track } = {};

  constructor(descs?: { [track: string]: ClipDesc<ClipState>[] }) {
    if (descs != null) {
      this.addClips(descs);
    }
  }

  public addTrack(key: string = ''): Track {
    if (!key) {
      key = `track-${this.tracks.length}`;
    }

    while (key in this.tracks) {
      key += '-copy';
    }

    const track = new Track(key);
    this.tracks[key] = track;
    return track;
  }

  public addClip<T extends ClipState>(
    track: string,
    start: number,
    end: number,
    stateBegin: T,
    stateEnd?: T
  ): Clip<T> {
    return this.track(track)!.addClip(start, end, stateBegin, stateEnd);
  }

  public addClips<T extends ClipState>(descs: { [track: string]: ClipDesc<T>[] }): Clip<T>[] {
    let clips: Clip<T>[] = [];
    for (const [track, trackDescs] of Object.entries(descs)) {
      clips = clips.concat(this.track(track)!.addClips(...trackDescs));
    }
    return clips;
  }

  public track(key: string): Track | undefined {
    if (!(key in this.tracks)) {
      this.tracks[key] = new Track(key);
    }

    return this.tracks[key];
  }

  state(time: number): TimelineState {
    const state: TimelineState = {};

    for (const trackName in this.tracks) {
      const track = this.tracks[trackName];
      state[trackName] = track.state(time);
    }

    return state;
  }
}
