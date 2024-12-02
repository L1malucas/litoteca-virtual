import { Injectable, Injector } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BaseResourceService } from "./system/base-resource.service";
import { HelpConfig } from "@config/help-config";

import { RegiaoModel } from "@models/regiao.model";

@Injectable({ providedIn: "root" })
export class RegiaoService extends BaseResourceService<RegiaoModel> {
  constructor(
    protected override injector: Injector,
    protected helpConfig: HelpConfig,
  ) {
    super(`${helpConfig.REGIAO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  override getAll(): Observable<RegiaoModel[]> {
    return this._httpClient
      .get<RegiaoModel[]>(`${this.helpConfig.REGIAO_ENDPOINT}BuscarRegioes`)
      .pipe(catchError(this.handleError));
  }

  override getById(id: string): Observable<RegiaoModel> {
    return this._httpClient
      .get<RegiaoModel>(`${this.helpConfig.REGIAO_ENDPOINT}BuscarRegiao/${id}`)
      .pipe(catchError(this.handleError));
  }

  buscarPorId(id: string): Observable<RegiaoModel> {
    return this._httpClient
      .get<RegiaoModel>(`${this.helpConfig.REGIAO_ENDPOINT}BuscarPorId/${id}`)
      .pipe(catchError(this.handleError));
  }
}
