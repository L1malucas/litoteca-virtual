import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";
import { AlvoModel } from "@models/alvo.model";
import { Observable } from "rxjs";

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
}