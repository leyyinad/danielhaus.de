export default (t: number, x: number, y: number) => blink(t / 1000.0, x, y);

const blink = (t: number, x: number, y: number) => {
  if (Math.floor(t % 2.0) == 0) {
    if (x % 2 && y % 2) {
      return 1.0;
    }
  }

  return 0.0;
};
