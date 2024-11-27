export class ConstantModel {
  id: number;
  descricao: string;

  constructor(options: ConstantModel) {
    this.id = options.id;
    this.descricao = options.descricao;
  }
}
