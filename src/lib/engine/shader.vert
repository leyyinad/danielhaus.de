#version 300 es
precision highp float;

in vec4 a_vertex_position;
uniform mat4 u_model_view_matrix;
uniform mat4 u_projection_matrix;

void main() {
  gl_Position = u_projection_matrix * u_model_view_matrix * a_vertex_position;
}
