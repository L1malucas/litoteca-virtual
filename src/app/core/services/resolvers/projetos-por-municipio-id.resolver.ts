import { map, catchError } from "rxjs/operators";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { ProjetoModel } from "@models/projeto.model";
import { ProjetoService } from "@services/projeto.service";

@Injectable({ providedIn: "root" })
export class ProjetosPorMunicipioIdResolver
  implements Resolve<Observable<ProjetoModel[]>>
{
  constructor(private projetoService: ProjetoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProjetoModel[]> {
    const municipioId: string = route.queryParamMap.get("municipio") || "";
    return this.projetoService.getByMunicipioId(municipioId).pipe(
      map((projetos) => {
        return projetos;
      }),
      catchError(() => {
        return of([]);
      }),
    );
  }
}
