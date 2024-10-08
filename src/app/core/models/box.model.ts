export interface Records {
  id?: string;
  boxId?: string;
  status?: number;
  part?: number;
  numberDocuments?: number;
  numberRecord?: number; // Alterado para numberRecord
  priority?: boolean;
  dateScan?: string; // Alterado para string
  documents?: any[]; // Adicionado para refletir a estrutura dos dados JSON
}

export class BoxModel {
  id?: string;
  rncx?: string;
  demand?: number;
  frameRoll?: string;
  startRange?: number; // Alterado para number
  endRange?: number; // Alterado para number
  records?: Records[];
  documentCount?: number; // Alterado para number
  dateScan?: string; // Alterado para string
  createdDate?: string; // Adicionado para refletir a estrutura dos dados JSON
  isDeleted?: boolean; // Adicionado para refletir a estrutura dos dados JSON

  constructor(options: Partial<BoxModel> = {}) {
    this.id = options.id || "";
    this.rncx = options.rncx || "";
    this.demand = options.demand || 0;
    this.frameRoll = options.frameRoll || "";
    this.startRange = options.startRange || 0; // Alterado para 0
    this.endRange = options.endRange || 0; // Alterado para 0
    this.records = options.records || [];
    this.dateScan = options.dateScan || "";
    this.createdDate = options.createdDate || ""; // Inicializa como string
    this.isDeleted = options.isDeleted || false; // Inicializa como false
  }
}
