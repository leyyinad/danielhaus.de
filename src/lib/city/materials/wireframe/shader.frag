#version 300 es
precision highp float;

out vec4 outColor;

in vec4 vertex_position;
in vec3 barycentric;

const float width = 0.006125f;

void main() {
	float alpha = pow(gl_FragCoord.w + 0.3335f, 3.0f);

	if (any(lessThan(barycentric, vec3(width)))) {
		outColor = vec4(0.5f, 1.0f, 0.75f, alpha);
	} else {
		outColor = vec4(0.0);
	}
}
