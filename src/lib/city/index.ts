import { Camera, Engine, Environment, Scene, createObject } from '$lib/engine';
import MeshFilter from '$lib/engine/components/mesh/mesh-filter';
import MeshRenderer from '$lib/engine/components/renderer/mesh-renderer';
import WebGLRenderer from '$lib/engine/drivers/webgl/webgl-renderer';
import { vec4 } from 'gl-matrix';
import cityGrid from './city-grid';
import wireframeMaterial from './materials/wireframe/material';
import Cube from './models/cube';
import CameraScript from './scripts/camera-script';
import CubeScript from './scripts/cube-script';

export default class City {
  engine: Engine;

  constructor(public canvas: HTMLCanvasElement) {
    const renderer = new WebGLRenderer(canvas);
    const scene = this.createScene();

    this.engine = new Engine(renderer);
    this.engine.scene = scene;
    this.engine.init();
  }

  createScene() {
    const scene = new Scene();

    const w = cityGrid[0].length;
    const h = cityGrid.length;

    const margin = 0.333;

    createObject({
      name: "Camera",
      components: [
        Camera,
        [Environment, { bgColor: vec4.create() }],
        CameraScript,
      ],
      scene,
      position: [-0.5 * (1.0 + margin) * w + 0.25, -1.8, -20.0],
      rotation: [0.0, 0.0, 0.0],
    });

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = cityGrid[y][x];

        if (c === 0.0) continue;

        createObject({
          components: [
            [MeshFilter, { mesh: new Cube() }],
            [MeshRenderer, { materials: [wireframeMaterial] }],
            CubeScript,
          ],
          scene,
          position: [x * (1.0 + margin), 0.0, y],
          scale: [1.0, c * 0.5, 1.0],
        });
      }
    }

    return scene;
  }
}
