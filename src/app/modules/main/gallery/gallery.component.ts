import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BoxModel } from "@models/box.model";
import { ProjetoModel } from "@models/projeto.model";
import { TargetService } from "@services/alvo.service";
import { BoxService } from "@services/box.service";
import { HoleService } from "@services/furo.service";
import { ProjetoService } from "@services/projeto.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.scss",
})
export class GalleryComponent {
  secoes = [];
  secoesMolhadas = [];
  imagens = [];
  projects!: ProjetoModel[];
  holeId!: string;
  boxId!: string;
  box!: BoxModel[];

  constructor(
    private _projectService: ProjetoService,
    private _boxService: BoxService,
    private _targetService: TargetService,
    private _holeService: HoleService,
    private _activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit() {
    this._activeRoute.queryParams.subscribe((params) => {
      if (params["projeto"]) {
        this.getTargetInfo(params["projeto"]);
      }
    });
  }

  getProjects() {
    this._projectService.getAll().subscribe((projetos) => {
      this.projects = projetos;
    });
  }

  getTargetInfo(projectId: string) {
    this._targetService
      .getTargetForProjectId(projectId)
      .subscribe((target: any) => {
        console.log(target);
        this.holeId = target[0].furos[0].id;
        console.log(this.holeId);
        this.getBoxByHoleId(this.holeId);
      });
  }

  getBoxByHoleId(holeId: string) {
    this._boxService.getBoxByHoleId(holeId).subscribe(console.log);
  }
}
