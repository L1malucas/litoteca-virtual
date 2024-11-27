import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MunicipioModel } from "@models/municipio.model";
import { ProjetoModel } from "@models/projeto.model";
import { MunicipioService } from "@services/municipio.service";

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
  ) {}

  ngOnInit() {
    this.filterProjects();
    this.carregarMunicipios();
  }

  ngAfterViewInit() {
    this._router.queryParams.subscribe((params) => {
      console.log(params);
      this.selectedMunicipio.id = params["municipio"];
    });
  }

  carregarMunicipios() {
    this._municipioService.getAll().subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) => {
      return project.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  goToGalery(project: ProjetoModel) {
    this.route.navigate(["/galeria"], {
      queryParams: { projeto: project.id },
    });
  }
}
