import { BufferType } from '../../../engine/geom/mesh';
import type Mesh from '../../geom/mesh';

export default class BufferMap<T> {
  private map: Map<Mesh, Map<BufferType, T>> = new Map();

  get(mesh: Mesh, type: BufferType) {
    return this.map.get(mesh)?.get(type);
  }

  set(mesh: Mesh, type: BufferType, buffer: T) {
    let meshMap = this.map.get(mesh);

    if (meshMap == null) {
      meshMap = new Map();
      this.map.set(mesh, meshMap);
    }

    meshMap.set(type, buffer);
  }
}
