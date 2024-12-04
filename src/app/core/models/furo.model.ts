import { BoxModel } from "./box.model";

export class HoleModel {
  id?: string;
  nome?: string;
  alvoId?: string;
  caixa?: BoxModel[];

  constructor(options: HoleModel = {}) {
    this.id = options.id || "";
    this.nome = options.nome || "";
    this.alvoId = options.alvoId || "";
    this.caixa = options.caixa || [];
  }
}
