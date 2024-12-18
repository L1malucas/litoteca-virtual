import { Component, ViewChild, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DropdownComponent } from "@components/drop-down/drop-down.component";
import { MunicipioModel } from "@models/municipio.model";
import { ProjetoModel } from "@models/projeto.model";
import { RegiaoModel } from "@models/regiao.model";
import { MunicipioService } from "@services/municipio.service";
import { ProjetoService } from "@services/projeto.service";
import { RegiaoService } from "@services/regiao.service";
import { forkJoin } from "rxjs";
import { StorageService } from "@services/system/storage.service";

@Component({
  selector: "app-consulta-regiao",
  templateUrl: "./consulta-regiao.component.html",
  styleUrls: ["./consulta-regiao.component.scss"],
})
export class ConsultaRegiaoComponent implements OnInit {
  @ViewChild(DropdownComponent) dropDown!: DropdownComponent;
  regioes: RegiaoModel[] = [];
  selectedRegion: RegiaoModel = new RegiaoModel();
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
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    // this.carregarRegioes();
  }

  //carregar região selecionada via query param
  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["regiao"]) {
        const regiaoId = params["regiao"]; // O ID da região recebido
        this._regiaoService.buscarPorId(regiaoId).subscribe((regiao) => {
          this.selectedRegion = regiao; // Armazena a região selecionada
          this.dropDown.selectItem(regiao, false); // Atualiza o dropdown sem emitir o evento
          this.buscarMunicipiosPorRegiao(regiaoId); // Realiza outras ações necessárias
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

    //if (this.municipiosFiltrados.length === 0) {
    // console.warn("Nenhum município com projeto encontrado para esta região.");
    //}

    return this.municipiosFiltrados;
  }

  backToHome() {
    this._router.navigate(["/home"]);
  }

  goConsultaFiltro(municipioId: string) {
    this.storageService.setItem("SELECTED_REGION", this.selectedRegion);
    this._router.navigate(["/consultar-regiao-filtro/"], {
      queryParams: { municipio: municipioId },
    });
  }

  // Atualizar dropdown
  updateDropDown(region: string) {
    this.dropDown.selectItem(region, false);
  }

  onItemSelected(event: any) {
    this.selectedRegion = event;
    this.buscarMunicipiosPorRegiao(event.id);
  }
}
