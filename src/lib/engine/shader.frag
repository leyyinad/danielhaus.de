#version 300 es
precision highp float;

out vec4 outColor;

in vec4 vertex_position;
in vec3 barycentric;

// float grid(vec2 parameter, float width, float feather) {
//   float w1 = width - feather * 0.5f;
//   vec2 d = fwidth(parameter);
//   vec2 looped = 0.5f - abs(mod(parameter, 1.0f) - 0.5f);
//   vec2 a2 = smoothstep(d * w1, d * (w1 + feather), looped);
//   return min(a2.x, a2.y);
// }

float gridB(vec3 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec3 d = fwidth(parameter);
  vec3 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(min(a3.x, a3.y), a3.z);
}

float grid(vec3 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec3 d = fwidth(parameter);
  vec3 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(min(a3.x, a3.y), a3.z);
}

void main() {
  // float v = grid(barycentric * 1.5f, 1.0f, 0.5f);
  // outColor = vec4(1.0f, 1.0f, 1.0f, 1.0f - v);

  if (any(lessThan(barycentric, vec3(0.0075f)))) {
    outColor = vec4(0.0f, 1.0f, 0.5f, 0.2f);
  } else {
    // outColor = vec4(0.0, 0.0, 0.0, 0.75);
    outColor = vec4(0.0);
    // outColor = vec4(0.0, 0.0, 0.333, 1.0);
  }
}
