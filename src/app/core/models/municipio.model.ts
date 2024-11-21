export class MunicipioModel {
  id: string;
  nome: string;
  uf: string;
  codigo: number;
  refiao_id: string;

  constructor(data: MunicipioModel) {
    this.id = data.id;
    this.nome = data.nome;
    this.uf = data.uf;
    this.codigo = data.codigo;
    this.refiao_id = data.refiao_id;
  }
}
