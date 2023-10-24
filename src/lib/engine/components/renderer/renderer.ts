import type Material from "../../renderer/material";
import Component from "../component";

export default class Renderer extends Component {
  public enabled = true;
  public materials: Material[] = [];

  get material() {
    return this.materials[0];
  }
}
