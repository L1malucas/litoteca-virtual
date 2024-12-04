import { Injectable, Injector } from "@angular/core";
import { HelpConfig } from "../config/help-config";
import { HttpClient } from "@angular/common/http";
import { BaseResourceService } from "./system/base-resource.service";
import { catchError, Observable, throwError } from "rxjs";
import { HoleModel } from "@models/furo.model";

@Injectable({
  providedIn: "root",
})
export class HoleService extends BaseResourceService<HoleModel> {
  constructor(
    protected override injector: Injector,
    private helpConfig: HelpConfig,
    private httpClient: HttpClient,
  ) {
    super(`${helpConfig.FURO_ENDPOINT}`, injector);
  }

  private handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(() => {
      return new Error("Something bad happened; please try again later.");
    });
  }

  override getById(id: string): Observable<HoleModel> {
    return this._httpClient
      .get<HoleModel>(`${this._url}BuscarPorId/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFurosByAlvoId(id: string): Observable<HoleModel[]> {
    return this._httpClient
      .get<HoleModel[]>(`${this._url}BuscarFuroPorAlvoId/${id}`)
      .pipe(catchError(this.handleError));
  }
}
