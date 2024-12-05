import { CaixaModel } from "./caixa.model";

export class FuroModel {
  id?: string;
  nome?: string;
  alvoId?: string;
  caixa?: CaixaModel[];

  constructor(options: FuroModel = {}) {
    this.id = options.id || "";
    this.nome = options.nome || "";
    this.alvoId = options.alvoId || "";
    this.caixa = options.caixa || [];
  }
}
