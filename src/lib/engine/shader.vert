#version 300 es
precision highp float;

in vec4 a_vertex_position;
in vec3 a_barycentric;

out vec4 vertex_position;
out vec3 barycentric;

uniform mat4 u_model_view_matrix;
uniform mat4 u_projection_matrix;

void main() {
  vertex_position = a_vertex_position;
  barycentric = a_barycentric;
  gl_Position = u_projection_matrix * u_model_view_matrix * a_vertex_position;
}
