import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlvoModel } from "@models/alvo.model";
import { HoleModel } from "@models/furo.model";
import { MunicipioModel } from "@models/municipio.model";
import { ProjetoModel } from "@models/projeto.model";
import { TargetService } from "@services/alvo.service";
import { HoleService } from "@services/furo.service";
import { MunicipioService } from "@services/municipio.service";
import { ProjetoService } from "@services/projeto.service";
import { map, Observable, startWith } from "rxjs";

@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrl: "./table-custom.component.scss",
})
export class TableCustomComponent implements OnInit, AfterViewInit {
  @Input() region: string = "";
  @Input() pavilhoes: any[] = [1, 2, 3];

  municipios: MunicipioModel[] = [];
  selectedMunicipio: MunicipioModel = new MunicipioModel();

  searchTerm: string = "";
  filteredProjects: ProjetoModel[] = [];
  filteredAlvos: AlvoModel[] = [];
  filteredFuros: HoleModel[] = [];

  alvos: AlvoModel[] = [];
  furos: HoleModel[] = [];
  projects: ProjetoModel[] = [];

  inputProject: string = "";
  inputTarget: string = "";
  selectedPavilhao: number = -1;

  pageSize: number = 5;
  page: number = 1;
  totalPages: number = 0;

  furoId: string = "";
  alvoId: string = "";

  projetoControl = new FormControl<ProjetoModel>(new ProjetoModel());
  alvoControl = new FormControl<AlvoModel>(new AlvoModel());
  furoControl = new FormControl<HoleModel>(new HoleModel());

  project: ProjetoModel = new ProjetoModel();
  alvo: AlvoModel = new AlvoModel();

  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _municipioService: MunicipioService,
    private _projetoService: ProjetoService,
    private _targetService: TargetService,
    private _holeService: HoleService,
  ) {}

  filtroProjetos!: Observable<ProjetoModel[]>;
  filtroAlvos!: Observable<AlvoModel[]>;
  filtroFuros!: Observable<HoleModel[]>;

  private _filterProject(name: string): ProjetoModel[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter((option) => {
      return option.nome.toLowerCase().includes(filterValue);
    });
  }
  private _filterAlvos(name: string): AlvoModel[] {
    const filterValue = name.toLowerCase();
    return this.alvos.filter((option) => {
      return option.nome.toLowerCase().includes(filterValue);
    });
  }
  private _filterFuros(name: string): HoleModel[] {
    const filterValue = name.toLowerCase();
    return this.furos.filter((option) => {
      return option.nome?.toLowerCase().includes(filterValue);
    });
  }

  ngOnInit() {
    this.carregarProjetos();
    // this.carregarMunicipios();
    this.alvoControl.disable();
    this.furoControl.disable();
    this.filtroProjetos = this.projetoControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.nome;
        return name
          ? this._filterProject(name as string)
          : this.projects.slice();
      }),
    );

    this.filtroAlvos = this.alvoControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.nome;
        return name ? this._filterAlvos(name as string) : this.alvos.slice();
      }),
    );

    this.filtroFuros = this.furoControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.nome;
        return name ? this._filterFuros(name as string) : this.furos.slice();
      }),
    );
  }

  ngAfterViewInit() {
    this._router.queryParams.subscribe((params) => {
      this.selectedMunicipio.id = params["municipio"];
    });
  }

  selectPavilhao(pos: number) {
    this.selectedPavilhao = pos;
  }

  carregarMunicipios() {
    this._municipioService.getAll().subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  // filtrarProjetos(event: any) {
  //   if (event) {
  //     this.searchTerm = event.target.value;
  //   }

  //   this.projects = this.projects.filter((project) => {
  //     return project.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
  //   });

  //   if (this.searchTerm === "") {
  //     this.projects = this.filteredProjects;
  //   }
  // }

  goToGalery(project: ProjetoModel, target: AlvoModel, hole: HoleModel) {
    this.route.navigate(["/galeria"], {
      queryParams: { projeto: project.id, alvo: target.id, hole: hole.id },
    });
  }

  carregarProjetos() {
    this._projetoService.getAll().subscribe((projetos) => {
      this.projects = projetos;
    });
  }

  filtrarProjetosPorMunicipio(event: any) {
    this._projetoService
      .getByMunicipioId(event.target.value)
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  mostrarNomeProjeto(projeto: ProjetoModel): string {
    return projeto && projeto.nome ? projeto.nome : "";
  }
  mostrarNomeAlvo(alvo: AlvoModel): string {
    return alvo && alvo.nome ? alvo.nome : "";
  }
  mostrarNomeFuro(furo: HoleModel): string {
    return furo && furo.nome ? furo.nome : "";
  }

  onProjectSelected() {
    if (this.projetoControl?.value?.id) {
      this.project = this.projetoControl.value;
      this.inputProject = this.projetoControl.value.id;
      this.alvoControl.setValue(null);
      this.furoControl.setValue(null);
      this.alvoControl.enable();
      this.furoControl.disable();
      this.filtrarAlvosPorProjeto();
    }
  }

  onAlvoSelected() {
    if (this.alvoControl?.value?.id) {
      this.alvoId = this.alvoControl.value.id;
      if (this.alvoId) {
        this.furoControl.setValue(null);
        this.furoControl.enable();
        this.alvo = this.alvoControl.value;
        this.carregarFurosPorAlvoId();
      }
    }
  }

  onFuroSelected() {
    if (this.furoControl?.value?.id) {
      this.furoId = this.furoControl.value.id;
      if (this.furoId) {
        this.filteredAlvos = [];
        this.filteredProjects = [];
        this.furos = [];
        this.carregarFurosPorFuroId();
      }
    }
  }

  goToMaps(selectedLink: string) {
    const link = document.createElement("a");
    link.href = selectedLink;
    link.click();
  }

  carregarFurosSelect(id: string) {
    this._holeService.getFurosByAlvoId(id).subscribe((furos) => {
      this.furos = furos;
    });
  }

  carregarFurosPorAlvoId() {
    this._holeService
      .getFurosPaginationByAlvoId(this.page, this.pageSize, this.alvoId)
      .subscribe((result) => {
        this.pageSize = result.pageSize;
        this.totalPages = result.totalDatas;
        this.page = result.pageNumber;
        this.furos = result.data;
      });
  }

  carregarFurosPorFuroId() {
    this._holeService
      .getFurosPaginationByFuroId(this.page, this.pageSize, this.furoId)
      .subscribe((result) => {
        this.pageSize = result.pageSize;
        this.totalPages = result.totalPages;
        this.furos = result.data;
      });
  }

  carregarFurosId(id: string) {
    this._holeService.getById(id).subscribe((furo) => {
      this.furos = [furo];
    });
  }

  carregarAlvosId(id: string) {
    this._targetService.getById(id).subscribe((alvo) => {
      this.filteredAlvos.push(alvo);
    });
  }

  carregarProjetoPorId(id: string) {
    this._projetoService.getById(id).subscribe((projeto) => {
      this.filteredProjects.push(projeto);
    });
  }

  filtrarAlvosPorProjeto() {
    if (this.inputProject) {
      this._targetService
        .getTargetForProjectId(this.inputProject)
        .subscribe((alvos) => {
          this.alvos = alvos;
        });
    }
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    console.log(event);
    if (this.furoId != "") {
      this.carregarFurosPorFuroId();
    }
    if (this.alvoId != "") {
      this.carregarFurosPorAlvoId();
    }
  }

  searchMap(municipio: MunicipioModel) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${municipio.nome}+${municipio.uf}`,
      "_blank",
    );
  }
}
