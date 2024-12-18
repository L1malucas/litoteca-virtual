import { Injectable, Injector } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BaseResourceService } from "./system/base-resource.service";
import { HelpConfig } from "@config/help-config";

import { ProjetoModel } from "@models/projeto.model";

@Injectable({ providedIn: "root" })
export class ProjetoService extends BaseResourceService<ProjetoModel> {
  constructor(
    protected override injector: Injector,
    protected helpConfig: HelpConfig,
  ) {
    super(`${helpConfig.PROJETO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => {
      return new Error(error);
    });
  }

  override getAll(): Observable<ProjetoModel[]> {
    return this._httpClient
      .get<ProjetoModel[]>(`${this.helpConfig.PROJETO_ENDPOINT}BuscarProjetos`)
      .pipe(catchError(this.handleError));
  }

  override getById(id: string): Observable<ProjetoModel> {
    return this._httpClient
      .get<ProjetoModel>(`${this.helpConfig.PROJETO_ENDPOINT}BuscarPorId/${id}`)
      .pipe(catchError(this.handleError));
  }

  getByMunicipioId(municipioId: string): Observable<ProjetoModel[]> {
    return this._httpClient
      .get<
        ProjetoModel[]
      >(`${this.helpConfig.PROJETO_ENDPOINT}BuscarPorMunicipioId/${municipioId}`)
      .pipe(catchError(this.handleError));
  }

  getTotalImages(id: string): Observable<ProjetoModel[]> {
    return this._httpClient
      .get<
        ProjetoModel[]
      >(`${this.helpConfig.PROJETO_ENDPOINT}TotalImagens/${id}`)
      .pipe(catchError(this.handleError));
  }
}
