import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor(private _router: Router) {}

  goConsultaRegiao(region?: string) {
    if (region) {
      this._router.navigate(["login/consultar-regiao"], {
        queryParams: { region: region },
      });
    } else {
      this._router.navigate(["login/consultar-regiao"]);
    }
  }
}
