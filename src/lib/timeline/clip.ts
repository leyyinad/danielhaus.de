export default class Clip {
  public end: number;

  constructor(
    public start: number,
    public length: number,
    public state: object = {},
  ) {
    this.end = start + length;
  }
};
