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
    this.buscarProjetsPorMunicipio();
  }

  buscarProjetsPorMunicipio() {
    const projetos = this._activeRoute.snapshot.queryParams["projetos"];
    console.log(projetos);
    if (projetos) {
      this._projetosService.getByMunicipioId(projetos).subscribe((projetos) => {
        this.projetos = projetos;
      });
    }
  }

  backToConsultarRegiao() {
    this._router.navigate(["/consultar-regiao"]);
  }
}
