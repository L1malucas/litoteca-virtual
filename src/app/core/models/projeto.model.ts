export class ProjetoModel {
  id?: string;
  nome: string;
  municipioId: string;
  localidade: string;
  operador: string;
  operadorId: string;
  constructor() {
    this.nome = "";
    this.municipioId = "";
    this.localidade = "";
    this.operador = "";
    this.operadorId = "";
  }
}
