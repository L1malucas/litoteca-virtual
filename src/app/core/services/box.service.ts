import { Injectable } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { BoxModel } from "@models/box.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BoxService {
  private readonly url = `${this.helpConfig.BOX_ENDPOINT}GetRecordsByFrameRoll`;

  constructor(
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {}

  public GetRecordsByFrameRoll(
    rolo: string,
    invervalo: string,
  ): Observable<BoxModel> {
    // Alterado para retornar BoxModel
    return this.httpClient.get<BoxModel>(`${this.url}/${rolo}/${invervalo}`);
  }

  // getData(): Observable<BoxModel> {
  //   // Alterado para retornar BoxModel
  //   return this.httpClient.get<BoxModel>(this.jsonUrl); // Ajuste de URL se necessário
  // }
}
