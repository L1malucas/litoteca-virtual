import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: "home-map",
  templateUrl: "./home-map.component.html",
  styleUrl: "./home-map.component.scss",
  imports: [NgOptimizedImage],
})
export class HomeMapComponent {
  constructor(private _router: Router) {}

  goConsultaRegiao(region?: string) {
    if (region) {
      this._router.navigate(["/consultar-regiao"], {
        queryParams: { region: region },
      });
    } else {
      this._router.navigate(["/consultar-regiao"]);
    }
  }
}
