export class MunicipioModel {
  id: string;
  nome: string;
  uf: string;
  codigo: number;
  refiao_id: string;

  constructor() {
    this.id = "";
    this.nome = "";
    this.uf = "";
    this.codigo = 0;
    this.refiao_id = "";
  }
}
