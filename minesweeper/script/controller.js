import { View } from "./view.js";
import { Model } from "./model.js";

export class AppLogic {
  constructor(rows, cols, bombCount) {
    this.model = new Model(rows, cols, bombCount);
    this.view = new View(this.model.arrField, rows, cols);
  }
}
