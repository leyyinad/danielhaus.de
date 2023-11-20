import { vec4 } from 'gl-matrix';
import Component from '../component';

export default class Environment extends Component {
  public bgColor: vec4 = vec4.fromValues(0.0, 0.0, 0.0, 1.0);
}
