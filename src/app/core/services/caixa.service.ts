import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { CaixaModel } from "../models/caixa.model";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";
import { CapturaModel } from "@models/captura.model";

@Injectable({
  providedIn: "root",
})
export class CaixaService extends BaseResourceService<CaixaModel> {
  constructor(
    protected override injector: Injector,
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {
    super(`${helpConfig.CAIXA_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  public buscarCaixaComParametros(params?: {
    [param: string]: any;
  }): Observable<any> {
    return this.httpClient
      .get<any>(`${this.helpConfig.CAIXA_ENDPOINT}BuscarComPaginacao`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  public buscarMiniaturasPorCaixaId(id: string): Observable<CapturaModel[]> {
    return this.httpClient
      .get<
        CapturaModel[]
      >(`${this.helpConfig.CAIXA_ENDPOINT}BuscarMiniaturasPorCaixaId/${id}`)
      .pipe(catchError(this.handleError));
  }

  public buscarCaixaPorFuro(furo: string): Observable<CaixaModel[]> {
    return this.httpClient
      .get<
        CaixaModel[]
      >(`${this.helpConfig.CAIXA_ENDPOINT}BuscarCaixaPorFuroId/${furo}`)
      .pipe(catchError(this.handleError));
  }

  public buscarCaixaPorId(id: string): Observable<CaixaModel> {
    return this.httpClient
      .get<CaixaModel>(`${this.helpConfig.CAIXA_ENDPOINT}BuscarPorId/${id}`)
      .pipe(catchError(this.handleError));
  }
}
