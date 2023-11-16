import Clip, { type ClipDesc, type ClipState } from './clip';

export default class Track {
	public clips: Clip<ClipState>[] = [];

	constructor(public name: string) {}

	public addClip<T extends ClipState>(
		start: number,
		end: number,
		stateBegin: T,
		stateEnd?: T
	): Clip<T> {
		const clip = new Clip(start, end, stateBegin, stateEnd);
		this.clips.push(clip);
		this.sortClips();
		return clip;
	}

	public addClips<T extends ClipState>(...descs: ClipDesc<T>[]): Clip<T>[] {
		return descs.map(([start, end, stateBegin, stateEnd]) =>
			this.addClip(start, end, stateBegin, stateEnd)
		);
	}

	public removeClips() {
		this.clips = [];
	}

	public sortClips() {
		this.clips.sort((a, b) => {
			const d = b.end - a.end;
			return d == 0.0 ? b.start - a.start : d;
		});
	}

	public state(time: number) {
		const state = {};

		for (const clip of this.clips) {
			if (time >= clip.end) {
				Object.assign(state, clip.state(clip.end));
			}
		}

		for (const clip of this.clips) {
			if (time >= clip.start && time < clip.end) {
				Object.assign(state, clip.state(time));
			}
		}

		return state;
	}
}
