import { Camera, Engine, Environment, Scene, createObject } from '$lib/engine';
import MeshFilter from '$lib/engine/components/mesh/mesh-filter';
import MeshRenderer from '$lib/engine/components/renderer/mesh-renderer';
import Renderer from '$lib/engine/components/renderer/renderer';
import WebGLRenderDriver from '$lib/engine/drivers/webgl/webgl-render-driver';
import { vec4 } from 'gl-matrix';
import cityGrid from './city-grid';
import wireframeMaterial from './materials/wireframe/material';
import Cube from './models/cube';
import CameraScript from './scripts/camera-script';
import CubeRootScript from './scripts/cube-root-script';
import CubeScript from './scripts/cube-script';

export default class City {
  engine: Engine | undefined;

  constructor(public canvas: HTMLCanvasElement) {
    const renderer = new WebGLRenderDriver(canvas);

    if (renderer.isSupported()) {
      this.engine = new Engine(renderer);
      this.engine.scene = this.createScene();
      this.engine.init();
    } else {
      console.warn(renderer.constructor.name, 'not supported.');
    }
  }

  createScene() {
    const scene = new Scene();

    const w = cityGrid[0].length;
    const h = cityGrid.length;

    const margin = 0.333;

    createObject({
      name: 'Camera',
      components: [Camera, [Environment, { bgColor: vec4.create() }], CameraScript],
      scene,
      position: [-0.5 * (1.0 + margin) * w + 0.25, -3, -20.0],
      rotation: [0.0, 0.0, 0.0]
    });

    const cubeRoot = createObject({
      name: 'CubeRoot',
      components: [CubeRootScript],
      scene
    });

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = cityGrid[y][x];

        if (c === 0.0) continue;

        const cube = createObject({
          components: [
            [MeshFilter, { mesh: new Cube() }],
            [MeshRenderer, { materials: [wireframeMaterial] }],
            CubeScript
          ],
          scene,
          position: [x * (1.0 + margin), 0.0, y],
          scale: [1.0, c * 0.5, 1.0],
          parent: cubeRoot
        });

        cube.getComponent(Renderer)!.enabled = false;
      }
    }

    return scene;
  }
}
