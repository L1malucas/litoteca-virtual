import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjetoModel } from "@models/projeto.model";
import { ProjetoService } from "@services/projeto.service";

@Component({
  selector: "app-consultar-regiao-filtro",
  templateUrl: "./consultar-regiao-filtro.component.html",
  styleUrl: "./consultar-regiao-filtro.component.scss",
})
export class ConsultarRegiaoFiltroComponent implements OnInit {
  projetos: ProjetoModel[] = [];

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _projetosService: ProjetoService,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._activeRoute.queryParams.subscribe((params) => {
      if (params["municipio"]) {
        this.buscarProjetsPorMunicipio(params["municipio"]);
      }
    });
  }

  buscarProjetsPorMunicipio(municipioId: string) {
    this._projetosService
      .getByMunicipioId(municipioId)
      .subscribe((projetos) => {
        this.projetos = projetos;
      });
  }

  backToConsultarRegiao() {
    this._router.navigate(["/home"]);
  }
}
