import type { UniformType } from '../../../city/materials/wireframe/material';
import { BufferType } from '../../../engine/geom/mesh';

export default class ShaderInfo {
  program?: WebGLProgram;
  attributes: Map<BufferType, number> = new Map();
  uniforms: Map<string, [WebGLUniformLocation, UniformType]> = new Map();
}
