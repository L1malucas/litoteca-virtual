export class CapturaModel {
  id: string;
  caixaId: string;
  imageReference: string;
  miniatureReference: string;
  dataCriacao: Date;
  operadorId: string;
  operador: string;
  ordem: number;
  secao: number;

  constructor() {
    this.id = "";
    this.caixaId = "";
    this.imageReference = "";
    this.miniatureReference = "";
    this.dataCriacao = new Date();
    this.operadorId = "";
    this.operador = "";
    this.ordem = 0;
    this.secao = 0;
  }
}
