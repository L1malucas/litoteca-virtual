interface Documents {
  id?: string;
  order?: number;
  fileReference?: string;
  fileBytes?: string;
  recordId?: string;
  dateScan?: Date;
  fileLoadType?: number;
}

export class RecordsModel {
  id?: string;
  boxId?: string;
  status?: number;
  part?: number;
  numberDocuments?: number;
  numberRecords?: number;
  documents?: Documents[];
  priority?: boolean;
  dateScan?: any;

  constructor(options: RecordsModel = {}) {
    this.id = options.id || "";
    this.boxId = options.boxId || "";
    this.status = options.status || 0;
    this.part = options.part || 0;
    this.numberDocuments = options.numberDocuments || 0;
    this.numberRecords = options.numberRecords || 0;
    this.documents = options.documents || [];
    this.priority = options.priority || true;
    this.dateScan = options.dateScan || null;
  }
}
