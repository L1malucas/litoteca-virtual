import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-consulta-regiao",
  templateUrl: "./consulta-regiao.component.html",
  styleUrl: "./consulta-regiao.component.scss",
})
export class ConsultaRegiaoComponent {
  options = [
    "EXTREMO OESTE BAIANO",
    " VALE SÃO FRANCISCO DA BAHIA",
    " NORDESTE BAIANO",
    " CENTRO NORTE BAIANO",
    " CENTRO SUL BAIANO",
    " METROPOLITANA DE SALVADOR",
    " SUL BAIANO",
  ];

  constructor(private _router: Router) {}

  backToHome() {
    this._router.navigate(["login/home"]);
  }
}
