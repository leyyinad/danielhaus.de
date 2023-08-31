import type { mat4 } from "gl-matrix";

export enum ShaderType {
  Vertex,
  Fragment,
}

export default class Shader {
  gl: WebGL2RenderingContext;
  program: WebGLProgram | null;
  shaders: {
    [type: number]: WebGLShader;
  };

  locations: {
    attrib: {
      [name: string]: number,
    };

    uniform: {
      [name: string]: WebGLUniformLocation,
    };
  };

  constructor(
    context: WebGL2RenderingContext,
    vert: string,
    frag: string,
    attribs: { [name: string]: string; },
    uniforms: { [name: string]: string; }
  ) {
    this.gl = context;
    this.shaders = {};
    this.program = null;
    this.locations = { attrib: {}, uniform: {} };

    this.load(ShaderType.Vertex, vert);
    this.load(ShaderType.Fragment, frag);
    this.link();

    this.initAttribLocations(attribs);
    this.initUniformLocations(uniforms);
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
      this.shaders[type] = shader;
    }
  }

  link() {
    const { gl } = this;
    const program = gl.createProgram()!;

    gl.attachShader(program, this.shaders[ShaderType.Vertex]);
    gl.attachShader(program, this.shaders[ShaderType.Fragment]);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(program)}`);
    } else {
      this.program = program;
    }
  }

  initAttribLocations(map: { [name: string]: string; }) {
    const { gl, program } = this;

    Object.entries(map).forEach(([key, value]) => {
      this.locations.attrib[key] = gl.getAttribLocation(program!, value);
    });
  }

  initUniformLocations(map: { [name: string]: string; }) {
    const { gl, program } = this;

    Object.entries(map).forEach(([key, value]) => {
      this.locations.uniform[key] = gl.getUniformLocation(program!, value)!;
    });
  }

  use() {
    this.gl.useProgram(this.program);
  }

  setUniformMatrices(data: { [name: string]: mat4; }) {
    const { gl } = this;
    const { uniform } = this.locations;
    Object.entries(data).forEach(([key, values]) => {
      gl.uniformMatrix4fv(uniform[key], false, values);
    });
  }
}
