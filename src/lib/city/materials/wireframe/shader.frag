#version 300 es
precision highp float;

out vec4 outColor;

in vec4 vertex_position;
in vec3 barycentric;

const float width = 0.006125f;

void main() {
  float alpha = pow(gl_FragCoord.w + 0.3335f, 3.0f);
  // float alpha = 1.0;
  // float alpha = pow(gl_FragCoord.w + 0.5f, 2.0f);

  if (any(lessThan(barycentric, vec3(width)))) {
    outColor = vec4(0.5f, 1.0f, 0.75f, alpha);
    // outColor = vec4(0.5f, 1.0f, 0.75f, 1.0);
    // outColor = vec4(barycentric.x, 0.0, barycentric.y, 1.0); // vec4(1.0);

    // outColor = vec4(1.0);
  } else {
    outColor = vec4(0.0);
  }

  // outColor = vec4(barycentric, 1.0);

  // outColor = vec4(1.0);
  // outColor = vec4(vec3(vertex_position), alpha);
  // outColor = vec4(1.0);
  // outColor = vec4(barycentric, 1.0, 1.0);
  // outColor = vec4(0.5);
}
