import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegiaoModel } from "@models/regiao.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  regioes: RegiaoModel[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.regioes = this._route.snapshot.data["regioes"];
  }

  goConsultaRegiao() {
    this._router.navigate(["/consultar-regiao"]);
  }

  goConsultaProjeto() {
    this._router.navigate(["/consultar-regiao-filtro/"]);
  }
}
