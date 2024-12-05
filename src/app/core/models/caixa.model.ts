export interface Captura {
  id: string;
  dataCriacao: Date;
  secao: number;
  imageReference: string;
  miniatureReference: string;
  ordem: number;
  caixaId: string;
  operador: string;
  operadorId: string;
}

export class CaixaModel {
  id?: string;
  nome: string;
  categoriaId: number;
  furoId: string;
  estante: string;
  prateleira: string;
  profundidadeInicial: string;
  profundidadeFinal: string;
  operador: string;
  operadorId: string;
  capturas: Captura[];
  dataCriacao: Date;

  constructor() {
    this.id = "";
    this.nome = "";
    this.categoriaId = 0;
    this.furoId = "";
    this.estante = "";
    this.prateleira = "";
    this.profundidadeInicial = "";
    this.profundidadeFinal = "";
    this.operador = "";
    this.operadorId = "";
    this.capturas = [];
    this.dataCriacao = new Date();
  }
}
