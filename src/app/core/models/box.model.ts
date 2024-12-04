export interface Records {
  id?: string;
  boxId?: string;
  status?: number;
  part?: number;
  numberDocuments?: number;
  numberRecord?: number;
  priority?: boolean;
  dateScan?: string;
  documents?: any[];
}

export class BoxModel {
  id?: string;
  ids?: string[];
  nome!: string;
  rncx?: string;
  demand?: number;
  frameRoll?: string;
  startRange?: number;
  endRange?: number;
  records?: Records[];
  documentCount?: number;
  dateScan?: string;
  createdDate?: string;
  isDeleted?: boolean;
  profundidadeInicial?: string;
  profundidadeFinal?: string;
  estante?: string;
  prateleira?: string;
  capturas?: Capturas[];

  constructor(options: Partial<BoxModel> = {}) {
    this.id = options.id || "";
    this.rncx = options.rncx || "";
    this.demand = options.demand || 0;
    this.frameRoll = options.frameRoll || "";
    this.startRange = options.startRange || 0;
    this.endRange = options.endRange || 0;
    this.records = options.records || [];
    this.dateScan = options.dateScan || "";
    this.createdDate = options.createdDate || "";
    this.isDeleted = options.isDeleted || false;
    this.profundidadeInicial = options.profundidadeInicial || "";
    this.profundidadeFinal = options.profundidadeFinal || "";
    this.estante = options.estante || "";
    this.prateleira = options.prateleira || "";
    this.capturas = options.capturas || [];
  }
}

class Capturas {
  id?: string;
  caixaId?: string;
  dataCriacao?: string;
  imageReference?: string;
  miniatureReference?: string;
  operador?: string;
  operadorId?: string;
  ordem?: number;
  secao?: number;

  constructor(options: Partial<Capturas> = {}) {
    this.id = options.id || "";
    this.caixaId = options.caixaId || "";
    this.dataCriacao = options.dataCriacao || "";
    this.imageReference = options.imageReference || "";
    this.miniatureReference = options.miniatureReference || "";
    this.operador = options.operador || "";
    this.operadorId = options.operadorId || "";
    this.ordem = options.ordem || 0;
    this.secao = options.secao || 0;
  }
}
