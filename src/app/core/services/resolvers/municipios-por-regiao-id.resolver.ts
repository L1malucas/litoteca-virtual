import { map, catchError } from "rxjs/operators";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { MunicipioModel } from "@models/municipio.model";
import { MunicipioService } from "@services/municipio.service";

@Injectable({ providedIn: "root" })
export class MunicipiosPorRegiaoIdResolver
  implements Resolve<Observable<MunicipioModel[]>>
{
  constructor(private municipioService: MunicipioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MunicipioModel[]> {
    const regiaoId: string = route.queryParams["regiao"] || "";
    if (!regiaoId) {
      return of([]);
    }
    return this.municipioService.getByRegionId(regiaoId).pipe(
      map((municipios) => {
        return municipios;
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
    );
  }
}
