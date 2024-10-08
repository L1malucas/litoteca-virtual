export class ConstantModel {
  id?: number | null;
  descricao?: string | null;
  enum?: string | null;

  constructor(options: ConstantModel = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.enum = options.enum || null;
  }
}
