#version 300 es
precision highp float;

out vec4 outColor;

in vec4 vertex_position;
in vec3 barycentric;

const float width = 0.006125f;
const vec3 color = vec3(0.5f, 1.0f, 0.75f);

void main() {
  float alpha = pow(gl_FragCoord.w + 0.4f, 4.0f);
  float interlace = 0.25f + 0.75f * mod(gl_FragCoord.y * 0.25f, 2.0f);

  if (any(lessThan(barycentric, vec3(width)))) {
    outColor = vec4(interlace * color, alpha);
  } else {
    outColor = vec4(0.0);
  }
}
