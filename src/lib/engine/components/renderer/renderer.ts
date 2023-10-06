import type Material from "../../renderer/material";
import Component from "../component";

export default class RendererComponent extends Component {
  public materials: Material[] = [];

  get material() {
    return this.materials[0];
  }
}
