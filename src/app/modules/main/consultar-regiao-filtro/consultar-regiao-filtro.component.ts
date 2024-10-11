import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-consultar-regiao-filtro",
  templateUrl: "./consultar-regiao-filtro.component.html",
  styleUrl: "./consultar-regiao-filtro.component.scss",
})
export class ConsultarRegiaoFiltroComponent {
  constructor(private _router: Router) {}

  backToConsultarRegiao() {
    this._router.navigate(["login/consultar-regiao"]);
  }
}
