import BaseObject from '../object';

export default class Scene {
	constructor(public name = 'Scene') {}

	getRootObjects() {
		return BaseObject.objects.filter((o) => o.scene === this && o.transform.parent == null);
	}
}
