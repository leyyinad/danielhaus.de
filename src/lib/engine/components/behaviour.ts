import Component from './component';

export default class Behaviour extends Component {
  enabled: boolean = true;
  _started = false;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}
