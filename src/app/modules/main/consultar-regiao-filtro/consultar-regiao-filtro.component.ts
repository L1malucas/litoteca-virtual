import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegiaoService } from "@services/regiao.service";

@Component({
  selector: "app-consultar-regiao-filtro",
  templateUrl: "./consultar-regiao-filtro.component.html",
  styleUrl: "./consultar-regiao-filtro.component.scss",
})
export class ConsultarRegiaoFiltroComponent implements OnInit {
  constructor(
    private _router: Router,
    private _regiaoService: RegiaoService,
  ) {
    this._regiaoService.getAll().subscribe((regioes) => {
      console.log(regioes);
    });
  }

  ngOnInit() {
    this._regiaoService.getAll().subscribe((regioes) => {
      console.log(regioes);
    });
  }

  backToConsultarRegiao() {
    this._router.navigate(["/consultar-regiao"]);
  }
}
