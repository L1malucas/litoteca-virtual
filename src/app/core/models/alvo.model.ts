import { HoleModel } from "./furo.model";

export class AlvoModel {
  id?: string;
  nome: string;
  projetoId: string;
  furos?: HoleModel[];
  constructor() {
    this.nome = "";
    this.projetoId = "";
    this.furos = [];
  }
}
