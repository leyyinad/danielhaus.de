import type { AttributeMap, UniformMap } from "../city/wireframe/material";

export enum ShaderType {
  Vertex,
  Fragment,
}

export default class Shader {
  constructor(
    public vert: string,
    public frag: string,
    public attributes: AttributeMap = new Map(),
    public uniforms: UniformMap = new Map(),
  ) { }
}
