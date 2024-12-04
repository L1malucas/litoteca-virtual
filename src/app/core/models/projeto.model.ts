import { MunicipioModel } from "@models/municipio.model";
import { AlvoModel } from "./alvo.model";

export class ProjetoModel {
  id?: string;
  nome: string;
  municipioId: string;
  municipio: MunicipioModel;
  localidade: string;
  operador: string;
  operadorId: string;
  alvos: AlvoModel[];
  furo: string;

  constructor() {
    this.nome = "";
    this.municipioId = "";
    this.municipio = new MunicipioModel();
    this.localidade = "";
    this.operador = "";
    this.operadorId = "";
    this.alvos = [];
    this.furo = "";
  }
}
