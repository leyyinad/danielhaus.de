import type { UniformType } from "../../city/wireframe/material";
import type { BufferType } from "./webgl-renderer";

export default class ShaderInfo {
  program?: WebGLProgram;
  attributes: Map<BufferType, number> = new Map();
  uniforms: Map<string, [WebGLUniformLocation, UniformType]> = new Map();
}
