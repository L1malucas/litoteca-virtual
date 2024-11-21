import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { RecordsModel } from "@models/records.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";

@Injectable({
  providedIn: "root",
})
export class RecordsService extends BaseResourceService<RecordsModel> {
  constructor(
    protected override injector: Injector,
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {
    super(`${helpConfig.ALVO_ENDPOINT}`, injector);
  }

  public getRecords(recordId: string): Observable<RecordsModel[]> {
    return this.httpClient.get<RecordsModel[]>(
      `${this.helpConfig.ALVO_ENDPOINT}/${recordId}`,
    );
  }
}
