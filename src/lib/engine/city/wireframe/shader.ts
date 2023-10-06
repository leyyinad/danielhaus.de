import Shader from '../../renderer/shader';
import type { AttributeMap, UniformMap } from './material';
import frag from './shader.frag';
import vert from './shader.vert';

export default (
  attribs: AttributeMap,
  uniforms: UniformMap,
) => new Shader(vert, frag, attribs, uniforms);
