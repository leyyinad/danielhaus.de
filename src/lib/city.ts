import { Engine } from '$lib/engine';
import Camera from '$lib/engine/components/camera/camera';
import MeshFilter from '$lib/engine/components/mesh/mesh-filter';
import MeshRenderer from '$lib/engine/components/renderer/mesh-renderer';
import WebGLRenderer from '$lib/engine/drivers/webgl/webgl-renderer';
import wireframeMaterial from '$lib/engine/city/wireframe/material';
import Cube from '$lib/engine/city/cube';
import Scene from '$lib/engine/scene/scene';
import { vec4 } from 'gl-matrix';
import CameraScript from './engine/city/camera-script';
import Environment from './engine/components/renderer/environment';
import ScriptBehaviour from './engine/components/script-behaviour';
import { createObject } from './engine/scene/scene-utils';
import Time from './engine/time';
import { BufferType } from './engine/meshes/mesh';

export default class City {
  engine: Engine;

  constructor(
    public context: WebGL2RenderingContext,
  ) {
    const renderer = new WebGLRenderer(context);
    const scene = this.createScene();

    this.engine = new Engine(renderer);
    this.engine.scene = scene;
    this.engine.init();
  }

  createScene() {
    const scene = new Scene();

    class AnimScript extends ScriptBehaviour {
      public update(): void {
        const amt = 3.0 / Time.timeDelta;
        // this.baseObject.transform.rotateX(0.333 * amt);
        // this.baseObject.transform.rotateY(amt);
        this.baseObject.transform.rotateY(-5.0 * amt);
      }
    }

    class AnimScript2 extends ScriptBehaviour {
      public update(): void {
        const amt = 3.0 / Time.timeDelta;
        // this.baseObject.transform.rotateX(0.333 * amt);
        // this.baseObject.transform.rotateY(amt);
        this.baseObject.transform.rotateX(-1.0 * amt);
      }
    }

    const camera = createObject({
      name: "Camera",
      components: [
        Camera,
        [Environment, { bgColor: vec4.create() }],
        CameraScript,
      ],
      scene,
      position: [0.0, -1.0, -10.0],
      rotation: [0.0, 0.0, 0.0],
    });

    const parent = createObject({
      scene,
      components: [
        AnimScript
      ],
    });

    // const cubeA = createObject({
    //   name: "Cube A",
    //   components: [
    //     [MeshFilter, { mesh: new Cube() }],
    //     [MeshRenderer, { materials: [wireframeMaterial] }],
    //     AnimScript
    //   ],
    //   scene,
    //   position: [0.0, -3.0, 0.0],
    //   // rotation: [45.0, 45.0, 45.0],
    // });

    // const cubeB = createObject({
    //   name: "Cube B",
    //   components: [
    //     [MeshFilter, { mesh: new Cube() }],
    //     [MeshRenderer, { materials: [wireframeMaterial] }],
    //     AnimScript2
    //   ],
    //   scene,
    //   position: [-1.0, 1.0, 0.0],
    //   // scale: [0.5, 0.5, 0.5],
    //   parent: cubeA,
    //   // rotation: [45.0, 45.0, 45.0],
    // });

    // camera.getComponent(Camera)!.transform.lookAt(cubeA.transform.position);

    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        createObject({
          name: `Cube ${i}, ${j}`,
          components: [
            [MeshFilter, { mesh: new Cube() }],
            [MeshRenderer, { materials: [wireframeMaterial] }],
          ],
          scene,
          position: [(i - 4) * 1.1, 0.0, (j + 1) * 1.1],
          // position: [(i - 4) * 0.5, 0.0, (j + 1) * 0.5],
          scale: [0.5, 0.5, 0.5],
          parent
        });
      }
    }

    return scene;
  }
}
