import type { ReadonlyVec2, ReadonlyVec3, ReadonlyVec4 } from 'gl-matrix';

export enum BufferType {
	VERTEX,
	NORMAL,
	TANGENT,
	UV,
	UV2,
	UV3,
	UV4,
	UV5,
	UV6,
	UV7,
	UV8,
	TRIANGLE
}

export default class Mesh {
	name: string = this.constructor.name;

	vertices?: ReadonlyVec3[];
	normals?: ReadonlyVec3[];
	tangents?: ReadonlyVec4[];
	uv?: ReadonlyVec2[];
	uv2?: ReadonlyVec2[];
	uv3?: ReadonlyVec2[];
	uv4?: ReadonlyVec2[];
	uv5?: ReadonlyVec2[];
	uv6?: ReadonlyVec2[];
	uv7?: ReadonlyVec2[];
	uv8?: ReadonlyVec2[];

	triangles?: number[];

	private _buffers!: BufferType[];

	get buffers(): readonly BufferType[] {
		if (this._buffers == null) {
			this._buffers = this.collectBuffers();
		}

		return this._buffers;
	}

	protected collectBuffers() {
		return Object.values(BufferType)
			.filter((bt): bt is BufferType => !isNaN(+bt))
			.filter((bt) => this.bufferData(bt) != null);
	}

	bufferData(type: BufferType) {
		switch (type) {
			case BufferType.VERTEX:
				return this.vertices;
			case BufferType.NORMAL:
				return this.normals;
			case BufferType.TANGENT:
				return this.tangents;
			case BufferType.UV:
				return this.uv;
			case BufferType.UV2:
				return this.uv2;
			case BufferType.UV3:
				return this.uv3;
			case BufferType.UV4:
				return this.uv4;
			case BufferType.UV5:
				return this.uv5;
			case BufferType.UV6:
				return this.uv6;
			case BufferType.UV7:
				return this.uv7;
			case BufferType.UV8:
				return this.uv8;
			case BufferType.TRIANGLE:
				return this.triangles;

			default:
				throw new Error('Invalid buffer type', type);
		}
	}

	bufferItemSize(type: BufferType) {
		switch (type) {
			case BufferType.TRIANGLE:
				return 1;

			case BufferType.VERTEX:
			case BufferType.NORMAL:
				return 3;

			case BufferType.TANGENT:
				return 4;

			case BufferType.UV:
			case BufferType.UV2:
			case BufferType.UV3:
			case BufferType.UV4:
			case BufferType.UV5:
			case BufferType.UV6:
			case BufferType.UV7:
			case BufferType.UV8:
				return 2;

			default:
				return 0;
		}
	}

	bufferArray(type: BufferType): ArrayBufferView | undefined {
		const data = this.bufferData(type);

		if (data != null) {
			switch (type) {
				case BufferType.TRIANGLE:
					return new Uint16Array(data as number[]);

				case BufferType.VERTEX:
				case BufferType.NORMAL:
					return new Float32Array((data as [number, number, number][]).flat());

				case BufferType.TANGENT:
					return new Float32Array((data as [number, number, number, number][]).flat());

				case BufferType.UV:
				case BufferType.UV2:
				case BufferType.UV3:
				case BufferType.UV4:
				case BufferType.UV5:
				case BufferType.UV6:
				case BufferType.UV7:
				case BufferType.UV8:
					return new Float32Array((data as [number, number][]).flat());

				default:
			}
		}
	}
}
