import type { ReadonlyVec3 } from 'gl-matrix';
import Mesh from '../../engine/geom/mesh';

export default class Cube extends Mesh {
	/*

    7------6
   /|     /|
  3------2 |
  | 4----|-5
  |/     |/
  0------1

  */

	constructor() {
		super();

		const vs = [
			[0.0, 0.0, 0.0],
			[1.0, 0.0, 0.0],
			[1.0, 1.0, 0.0],
			[0.0, 1.0, 0.0],
			[0.0, 0.0, 1.0],
			[1.0, 0.0, 1.0],
			[1.0, 1.0, 1.0],
			[0.0, 1.0, 1.0]
		] as ReadonlyVec3[];

		const ts = [
			[0, 1, 2],
			[0, 2, 3],
			[1, 5, 6],
			[1, 6, 2],
			[4, 0, 3],
			[4, 3, 7],
			[0, 4, 5],
			[0, 5, 1],
			[3, 7, 6],
			[3, 6, 2],
			[4, 7, 6],
			[4, 6, 5]
		];

		const vertices = [];
		const triangles = [];
		const normals = [];

		let c = 0;
		for (const tri of ts) {
			vertices.push(vs[tri[0]]);
			vertices.push(vs[tri[1]]);
			vertices.push(vs[tri[2]]);

			triangles.push(c++);
			triangles.push(c++);
			triangles.push(c++);

			normals.push([1.0, 0.0, 0.0] as ReadonlyVec3);
			normals.push([0.0, 1.0, 0.0] as ReadonlyVec3);
			normals.push([0.0, 0.0, 1.0] as ReadonlyVec3);
		}

		this.vertices = vertices;
		this.triangles = triangles;
		this.normals = normals;
	}
}
