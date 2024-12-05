import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";
import { AlvoModel } from "@models/alvo.model";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TargetService extends BaseResourceService<AlvoModel> {
  constructor(
    protected override injector: Injector,
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {
    super(`${helpConfig.ALVO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  getTargetForProjectId(projectId: string): Observable<AlvoModel[]> {
    return this.httpClient.get<AlvoModel[]>(
      `${this._url}BuscarAlvosPorProjetoId/${projectId}`,
    );
  }

  getTargetPaginationByProjectId(
    pageNumber: string,
    pageSize: string,
    projectId: string,
  ): Observable<AlvoModel[]> {
    return this.httpClient.get<AlvoModel[]>(
      `${this._url}BuscarComPaginacao?ProjetoId=${projectId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
  }

  public buscarAlvoPorId(id: string): Observable<AlvoModel> {
    return this.httpClient
      .get<AlvoModel>(`${this._url}BuscarPorId/${id}`)
      .pipe(catchError(this.handleError));
  }
}
