import { Injectable, Injector } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BaseResourceService } from "./system/base-resource.service";
import { HelpConfig } from "@config/help-config";

import { AlvoModel } from "@models/alvo.model";

@Injectable({ providedIn: "root" })
export class AlvoService extends BaseResourceService<AlvoModel> {
  constructor(
    protected override injector: Injector,
    protected helpConfig: HelpConfig,
  ) {
    super(`${helpConfig.ALVO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  override getAll(): Observable<AlvoModel[]> {
    return this._httpClient
      .get<AlvoModel[]>(`${this.helpConfig.ALVO_ENDPOINT}BuscarAlvos`)
      .pipe(catchError(this.handleError));
  }

  getByProjectId(id: string): Observable<AlvoModel[]> {
    return this._httpClient
      .get<
        AlvoModel[]
      >(`${this.helpConfig.ALVO_ENDPOINT}BuscarAlvosPorProjetoId/${id}`)
      .pipe(catchError(this.handleError));
  }
}
