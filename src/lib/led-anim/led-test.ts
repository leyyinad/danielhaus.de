const ON = 1.0;
const OFF = 0.0;
const toggle = (state: number) => ON - state;

const blink = (t: number, x: number, y: number, w: number, h: number) => {
	const light = Math.floor(t % 2.0) === 0 ? ON : OFF;
	const dark = toggle(light);

	return x % 2 !== y % 2 ? light : dark;
};

const ledTest = (t: number, x: number, y: number, w: number, h: number) => {
	t = t * 8.0;
	return Math.floor(t % w) === x && Math.floor((t % (w * h)) / h) === y ? ON : OFF;
};

const ledTest2 = (t: number, x: number, y: number, w: number, h: number) =>
	Math.floor(t % w) === x || Math.floor(t % w) === y ? ON : OFF;

// const swoosh = (t: number, x: number, y: number) => {
//   return 0;
// };

const anim = (t: number, x: number, y: number, w: number, h: number) => {
	t = t % 48;
	if (t < 16) {
		return blink(t, x, y, w, h);
	} else if (t < 32) {
		return ledTest(t, x, y, w, h);
	} else {
		return ledTest2(t, x, y, w, h);
	}
};

export default anim;
