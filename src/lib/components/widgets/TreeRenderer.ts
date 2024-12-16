export default class TreeRenderer {
  public center = 160;
  protected width = 320;
  protected height = 200;
  public size = 48;

  constructor(
    protected readonly canvas: HTMLCanvasElement,
    protected readonly context: CanvasRenderingContext2D
  ) {
    this.resize();
  }

  render(x: number, angle: number, depth: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.lineWidth = 1;
    this.context.strokeStyle = 'white';
    this.context.fillStyle = '#00c33d';

    const s = this.size;
    const y = -0.5 * s;

    const ctx = this.context;

    ctx.translate(x, y + this.canvas.height);
    ctx.scale(1.75, -1.75);
    this.renderTree(angle, depth);
  }

  getBranchColor(depth: number) {
    const r = 16 + 4 * depth;
    const g = 195 - 16 * depth;
    const b = 61 - 3 * depth;

    return `rgb(${r} ${g} ${b})`;
  }

  renderTree(angle: number, depth: number) {
    const ctx = this.context;

    this.context.fillStyle = this.getBranchColor(depth);
    this.renderSquare();

    if (depth > 1) {
      // left subtree
      ctx.translate(0, this.size);
      ctx.save();

      const rad = (angle * Math.PI) / 180;

      ctx.rotate(rad);

      const sf = Math.cos(rad);
      ctx.scale(sf, sf);

      this.renderTree(angle, depth - 1);

      ctx.restore();

      // right subtree
      ctx.save();
      ctx.translate(this.size, 0);

      const rad2 = ((-90 - angle) * Math.PI) / 180;
      ctx.rotate(-rad2);

      const sf2 = Math.cos(rad2);
      ctx.scale(sf2, sf2);
      ctx.translate(-this.size, 0);

      this.renderTree(angle, depth - 1);

      ctx.restore();
    }
  }

  renderSquare() {
    const s = this.size;

    const w = 0.2 * s;
    const h0 = s * 1.05;
    const h1 = s * -0.5;

    this.context.beginPath();
    this.context.moveTo(s * 0.5 - w, h1);
    this.context.lineTo(s * 0.5 - w, h0);
    this.context.lineTo(s * 0.5, h0 * 1.1);
    this.context.lineTo(s * 0.5 + w, h0);
    this.context.lineTo(s * 0.5 + w, h1);
    this.context.closePath();

    this.context.fill();
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }
}
