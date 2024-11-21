export class RegiaoModel {
  id?: string;
  dataCriacao: Date;
  nome: string;

  constructor(data: RegiaoModel) {
    this.id = data.id;
    this.dataCriacao = data.dataCriacao;
    this.nome = data.nome;
  }
}
