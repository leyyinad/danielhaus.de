import { BufferType } from "../../meshes/mesh";
import Material from "../../renderer/material";
import createShader from "./shader";

export enum UniformType {
  FLOAT,
  VEC2,
  VEC3,
  VEC4,
  MAT4,
};

export type AttributeMap = Map<BufferType, string>;
export type UniformMap = Map<string, [string, UniformType]>;

const attribs: AttributeMap = new Map([
  [BufferType.VERTEX, 'a_vertex_position'],
  [BufferType.NORMAL, 'a_normal'],
]);

const uniforms: UniformMap = new Map([
  ['projection', ['u_projection_matrix', UniformType.MAT4]],
  ['modelView', ['u_model_view_matrix', UniformType.MAT4]],
]);

const shader = createShader(attribs, uniforms);

export default new Material(shader);
