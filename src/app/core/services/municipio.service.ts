import { Injectable, Injector } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BaseResourceService } from "./system/base-resource.service";
import { HelpConfig } from "@config/help-config";

import { MunicipioModel } from "@models/municipio.model";

@Injectable({ providedIn: "root" })
export class MunicipioService extends BaseResourceService<MunicipioModel> {
  constructor(
    protected override injector: Injector,
    protected helpConfig: HelpConfig,
  ) {
    super(`${helpConfig.MUNICIPIO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  override getAll(): Observable<MunicipioModel[]> {
    return this._httpClient
      .get<
        MunicipioModel[]
      >(`${this.helpConfig.MUNICIPIO_ENDPOINT}BuscarMunicipios`)
      .pipe(catchError(this.handleError));
  }

  override getById(id: string): Observable<MunicipioModel> {
    return this._httpClient
      .get<MunicipioModel>(
        `${this.helpConfig.MUNICIPIO_ENDPOINT}BuscarPorId/${id}`,
      )
      .pipe(catchError(this.handleError));
  }

  getByRegionId(regionId: string): Observable<MunicipioModel[]> {
    return this._httpClient
      .get<
        MunicipioModel[]
      >(`${this.helpConfig.MUNICIPIO_ENDPOINT}BuscarMunicipiosPorRegiaoId/${regionId}/municipios`)
      .pipe(catchError(this.handleError));
  }
}
