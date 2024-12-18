import { map, catchError } from "rxjs/operators";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { CaixaModel } from "@models/caixa.model";
import { CaixaService } from "@services/caixa.service";

@Injectable({ providedIn: "root" })
export class CaixaPorFuroResolver implements Resolve<Observable<CaixaModel[]>> {
  constructor(private caixaService: CaixaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaixaModel[]> {
    const furo: string = route.queryParamMap.get("furo") || "";
    if (!furo) {
      return of([]);
    }
    return this.caixaService.buscarCaixaPorFuro(furo).pipe(
      map((caixa) => {
        return caixa;
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
    );
  }
}
