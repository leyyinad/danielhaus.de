export type ClipState = {
	[key: string]: number | boolean;
};

export type ClipDesc<T extends ClipState> = [
	number, // start
	number, // end
	T, // statteBegin
	T? // stateEnd
];

export default class Clip<T extends ClipState> {
	public length: number;

	constructor(
		public start: number,
		public end: number,
		private stateBegin: T,
		private stateEnd?: T
	) {
		if (start > end) {
			[this.start, this.end] = [end, start];
		}

		this.length = Math.max(this.end - this.start, 1e-10);
	}

	state(time: number) {
		if (this.stateEnd == null) {
			return this.stateBegin;
		}

		// console.log(time, this.start, this.length, (time - this.start) / this.length);

		return this.interpolate(this.stateBegin, this.stateEnd, (time - this.start) / this.length);
	}

	interpolate(a: T, b: T, t: number): T {
		if (t <= 0.0) return a;
		if (t >= 1.0) return b;

		const c: T = { ...a };
		for (const key in a) {
			const v0 = a[key];
			const v1 = b[key];

			if (v0 == v1) {
				c[key] = v0;
				break;
			}

			const value = +v0 * (1 - t) + +v1 * t;

			if (v0 === true || v0 === false) {
				c[key] = value != 0 ? true : false;
			} else {
				c[key] = value;
			}
		}

		return c;
	}
}
