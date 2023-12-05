import type Shader from '../../renderer/shader';
import { ShaderType } from '../../renderer/shader';
import type WebGLRenderDriver from './webgl-render-driver';

export default class ShaderCompiler {
  constructor(public driver: WebGLRenderDriver) {}

  compile(shader: Shader) {
    return this.link(
      [
        this.load(ShaderType.Vertex, shader.vert),
        this.load(ShaderType.Fragment, shader.frag)
      ].filter((s): s is WebGLShader => s != null)
    );
  }

  load(type: ShaderType, source: string) {
    const { gl } = this;

    const glType = type == ShaderType.Fragment ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
    const shader = gl.createShader(glType)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
    } else {
      return shader;
    }
  }

  link(shaders: WebGLShader[]) {
    const { gl } = this;

    const program = gl.createProgram()!;

    shaders.forEach((shader) => gl.attachShader(program, shader));
    gl.linkProgram(program);

    return program;
  }

  get gl() {
    return this.driver.context!;
  }
}
