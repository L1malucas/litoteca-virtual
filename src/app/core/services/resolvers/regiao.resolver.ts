import { Resolve } from "@angular/router";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { RegiaoModel } from "@models/regiao.model";
import { RegiaoService } from "@services/regiao.service";

@Injectable({ providedIn: "root" })
export class RegiaoResolver implements Resolve<Observable<RegiaoModel[]>> {
  constructor(private regiaoService: RegiaoService) {}

  resolve(): Observable<RegiaoModel[]> {
    return this.regiaoService.getAll().pipe(
      map((regioes) => {
        return regioes;
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
    );
  }
}
