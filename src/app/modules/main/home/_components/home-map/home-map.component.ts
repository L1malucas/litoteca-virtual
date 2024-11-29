import { Component, Input } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { Router } from "@angular/router";

import { REGIAO_CONSTANTS } from "@constants/regiao.constants";
import { RegiaoModel } from "@models/regiao.model";

@Component({
  standalone: true,
  selector: "home-map",
  templateUrl: "./home-map.component.html",
  styleUrl: "./home-map.component.scss",
  imports: [NgOptimizedImage],
})
export class HomeMapComponent {
  regioes = REGIAO_CONSTANTS;
  @Input() region: RegiaoModel[] = new Array<RegiaoModel>();
  constructor(private _router: Router) {}

  goConsultaRegiao(region?: string) {
    if (region) {
      this._router.navigate(["/consultar-regiao/"], {
        queryParams: { regiao: region },
      });
    }
  }
}
