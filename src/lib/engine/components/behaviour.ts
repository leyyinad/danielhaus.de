import Component from "./component";

export default class Behaviour extends Component {
  enabled: boolean = true;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}
