import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MunicipioModel } from "@models/municipio.model";
import { ProjetoModel } from "@models/projeto.model";
import { MunicipioService } from "@services/municipio.service";
import { ProjetoService } from "@services/projeto.service";

@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrl: "./table-custom.component.scss",
})
export class TableCustomComponent implements OnInit, AfterViewInit {
  @Input() region: string = "";
  @Input() projects: ProjetoModel[] = [];
  municipios: MunicipioModel[] = [];
  selectedMunicipio: MunicipioModel = new MunicipioModel();

  searchTerm: string = "";
  filteredProjects: ProjetoModel[] = [];

  constructor(
    private route: Router,
    private _router: ActivatedRoute,
    private _municipioService: MunicipioService,
    private _projetoService: ProjetoService,
  ) {}

  ngOnInit() {
    this.carregarProjetos();
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

  goToGalery(project: ProjetoModel) {
    this.route.navigate(["/galeria"], {
      queryParams: { projeto: project.id },
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

  searchMap(municipio: MunicipioModel) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${municipio.nome}+${municipio.uf}`,
      "_blank",
    );
  }
}
