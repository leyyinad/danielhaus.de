import { mat4, type ReadonlyMat4 } from 'gl-matrix';

export default class MatrixStack {
	stack: ReadonlyMat4[] = [];

	constructor() {
		this.pop();
	}

	push(m: ReadonlyMat4) {
		this.stack.push(m);
	}

	pop() {
		this.stack.pop();

		if (this.stack.length < 1) {
			this.stack[0] = mat4.create();
		}
	}

	get current(): ReadonlyMat4 {
		return this.stack[this.stack.length - 1];
	}
}
