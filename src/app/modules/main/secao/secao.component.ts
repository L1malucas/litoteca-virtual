import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-secao",
  templateUrl: "./secao.component.html",
  styleUrls: ["./secao.component.scss"],
})
export class SecaoComponent {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  goConsultaRegiao() {
    this._router.navigate(["/consultar-regiao"]);
  }

  goConsultaProjeto() {
    this._router.navigate(["/consultar-regiao-filtro/"]);
  }
}
