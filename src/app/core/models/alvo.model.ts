import { FuroModel } from "./furo.model";

export class AlvoModel {
  id?: string;
  nome: string;
  projetoId: string;
  furos?: FuroModel[];
  constructor() {
    this.nome = "";
    this.projetoId = "";
    this.furos = [];
  }
}
