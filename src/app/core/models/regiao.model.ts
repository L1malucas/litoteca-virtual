export class RegiaoModel {
  id?: string;
  dataCriacao: Date;
  nome: string;

  constructor() {
    this.dataCriacao = new Date();
    this.nome = "";
  }
}
