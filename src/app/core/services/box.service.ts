import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { BoxModel } from "@models/box.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";

@Injectable({
  providedIn: "root",
})
export class BoxService extends BaseResourceService<BoxModel> {
  constructor(
    protected override injector: Injector,
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {
    super(`${helpConfig.CAIXA_ENDPOINT}`, injector);
  }

  public GetRecordsByFrameRoll(
    rolo: string,
    invervalo: string,
  ): Observable<BoxModel> {
    // Alterado para retornar BoxModel
    return this.httpClient.get<BoxModel>(
      `${this.helpConfig.CAIXA_ENDPOINT}/${rolo}/${invervalo}`,
    );
  }

  // getData(): Observable<BoxModel> {
  //   // Alterado para retornar BoxModel
  //   return this.httpClient.get<BoxModel>(this.jsonUrl); // Ajuste de URL se necessário
  // }
}
