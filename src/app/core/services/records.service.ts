import { Injectable } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { RecordsModel } from "@models/records.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RecordsService {
  private readonly url = `${this.helpConfig.RECORDS_ENDPOINT}GetDocuments`;

  constructor(
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {}

  public getRecords(recordId: string): Observable<RecordsModel[]> {
    return this.httpClient.get<RecordsModel[]>(`${this.url}/${recordId}`);
  }
}
