import { Component, ViewChild, ChangeDetectorRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DropdownComponent } from "@components/drop-down/drop-down.component";
import { MunicipioModel } from "@models/municipio.model";
import { ProjetoModel } from "@models/projeto.model";
import { RegiaoModel } from "@models/regiao.model";
import { MunicipioService } from "@services/municipio.service";
import { ProjetoService } from "@services/projeto.service";
import { RegiaoService } from "@services/regiao.service";
import { forkJoin } from "rxjs";
import { REGIAO_ENUM } from "src/app/core/enums/regiao.enum";

@Component({
  selector: "app-consulta-regiao",
  templateUrl: "./consulta-regiao.component.html",
  styleUrls: ["./consulta-regiao.component.scss"],
})
export class ConsultaRegiaoComponent implements OnInit {
  @ViewChild(DropdownComponent) dropDown!: DropdownComponent;
  regioes: RegiaoModel[] = [];
  selectedRegion: RegiaoModel | null = null;
  municipios: MunicipioModel[] = [];
  municipiosFiltrados: MunicipioModel[] = [];
  projetos: ProjetoModel[] = [];
  backgroundUrl: string = "../../../../assets/images/png/MapaBahia.png";

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _regiaoService: RegiaoService,
    private _municipioService: MunicipioService,
    private _projetoService: ProjetoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregarRegioes();
    this.route.queryParams.subscribe((params) => {
      if (params["region"]) {
        this.onItemSelected(params["region"]);
        setTimeout(() => {
          this.updateDropDown(params["region"]);
        });
      }
    });
  }

  // Carregar regiões
  carregarRegioes() {
    this._regiaoService.getAll().subscribe((regioes) => {
      this.regioes = regioes;
    });
  }

  // Carregar municipios por região e projetos
  buscarMunicipiosPorRegiao(regiaoId: string) {
    forkJoin([
      this._municipioService.getByRegionId(regiaoId),
      this._projetoService.getAll(),
    ]).subscribe(([municipios, projetos]) => {
      this.projetos = projetos;
      this.filtrarMunicipios(municipios);
    });
  }

  // Carregar projetos
  carregarProjetos() {
    this._projetoService.getAll().subscribe((projetos) => {
      this.projetos = projetos;
    });
  }

  regiaoSelecionada() {
    if (this.selectedRegion) {
      this._router.navigate(["/consulta-regiao"], {
        queryParams: { region: this.selectedRegion.nome },
      });
    }
  }

  // Filtrar municípios que possuem projetos
  filtrarMunicipios(municipios: MunicipioModel[]) {
    const municipioIdsComProjetos = new Set(
      this.projetos.map((projeto) => {
        return String(projeto.municipioId);
      }),
    );

    this.municipiosFiltrados = municipios.filter((municipio) => {
      return municipioIdsComProjetos.has(String(municipio.id));
    });

    if (this.municipiosFiltrados.length === 0) {
      console.warn("Nenhum município com projeto encontrado para esta região.");
    }
  }

  backToHome() {
    this._router.navigate(["/home"]);
  }

  goConsultaFiltro() {
    this._router.navigate(["/consultar-regiao-filtro"]);
  }

  updateDropDown(region: string) {
    if (this.dropDown) {
      this.dropDown.selectItem(region, false);
    }
  }

  onItemSelected(event: any) {
    this.selectedRegion = event;
    this.buscarMunicipiosPorRegiao(event.id);
    switch (event.nome) {
      case REGIAO_ENUM.EXTREMO_OESTE_BAIANO:
        this.backgroundUrl = "../../../../assets/images/png/PurpleRegion.png";
        break;
      case REGIAO_ENUM.VALE_SAO_FRANCISCO_DA_BAHIA:
        this.backgroundUrl = "../../../../assets/images/png/BlueRegion.png";
        break;
      case REGIAO_ENUM.NORDESTE_BAIANO:
        this.backgroundUrl = "../../../../assets/images/png/DarkBlueRegion.png";
        break;
      case REGIAO_ENUM.CENTRO_NORTE_BAIANO:
        this.backgroundUrl = "../../../../assets/images/png/YellowRegion.png";
        break;
      case REGIAO_ENUM.CENTRO_SUL_BAIANO:
        this.backgroundUrl = "../../../../assets/images/png/OrangeRegion.png";
        break;
      case REGIAO_ENUM.METROPOLITANA_DE_SALVADOR:
        this.backgroundUrl = "../../../../assets/images/png/GreenRegion.png";
        break;
      case REGIAO_ENUM.SUL_BAIANO:
        this.backgroundUrl = "../../../../assets/images/png/LimeRegion.png";
        break;
      default:
        this.backgroundUrl = "../../../../assets/images/png/MapaBahia.png";
    }
  }
}
