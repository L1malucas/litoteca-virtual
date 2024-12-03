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
  @Input() projects: ProjetoModel[] = [];
  @Input() pavilhoes: number[] = [1, 2, 3];

  municipios: MunicipioModel[] = [];
  selectedMunicipio: MunicipioModel = new MunicipioModel();

  searchTerm: string = "";
  filteredProjects: ProjetoModel[] = [];

  alvos: AlvoModel[] = [];
  furos: HoleModel[] = [];

  inputProject: string = "";
  inputTarget: string = "";

  projetoControl = new FormControl<ProjetoModel>(new ProjetoModel());
  alvoControl = new FormControl<string>("");

  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _municipioService: MunicipioService,
    private _projetoService: ProjetoService,
    private _targetService: TargetService,
    private _holeService: HoleService,
  ) {}

  filtroProjetos!: Observable<ProjetoModel[]>;

  private _filter(name: string): ProjetoModel[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter((option) =>
      {return option.nome.toLowerCase().includes(filterValue)},
    );
  }

  ngOnInit() {
    this.carregarMunicipios();
    this.carregarProjetos();
    this.filtroProjetos = this.projetoControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.nome;
        return name ? this._filter(name as string) : this.projects.slice();
      }),
    );
  }

  ngAfterViewInit() {
    this._router.queryParams.subscribe((params) => {
      this.selectedMunicipio.id = params["municipio"];
    });
  }

  ngOnChanges() {
    this.filteredProjects = this.projects;
  }

  carregarMunicipios() {
    this._municipioService.getAll().subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  filtrarProjetos(event: any) {
    if (event) {
      this.searchTerm = event.target.value;
    }

    this.projects = this.projects.filter((project) => {
      return project.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    if (this.searchTerm === "") {
      this.projects = this.filteredProjects;
    }
  }

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
  onInputProjectChange(event: any) {
    console.log(event.target);
  }
  mostrarNomeProjeto(projeto: ProjetoModel): string {
    return projeto && projeto.nome ? projeto.nome : "";
  }

  onProjectSelected() {
    if (this.projetoControl?.value?.id) {
      this.inputProject = this.projetoControl.value.id;
      this.filtrarAlvosPorProjeto();
    }
  }
  carregarFuros(id: string) {
    this._holeService.getFurosByAlvoId(id).subscribe((furos) => {
      this.furos = furos;
    });
  }
  onAlvoSelected() {
    if (this.alvoControl?.value) {
      const alvoId: string = this.alvoControl.value;
      if (alvoId) {
        this.carregarFuros(alvoId);
        // this.filtrarProjetosPorAlvo(alvoId)
      }
    }
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
  // filtrarProjetosPorAlvo(alvoId:string){
  //   this.projects = this.projects.filter(project => {project.alvos[0].id === alvoId})
  // }

  searchMap(municipio: MunicipioModel) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${municipio.nome}+${municipio.uf}`,
      "_blank",
    );
  }
}
