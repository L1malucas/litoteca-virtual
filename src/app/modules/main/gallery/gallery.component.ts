import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  public formData: any = {
    nome: "",
    municipio: "",
    localidade: "",
    furo: "",
    pavilhao: "",
    profundidadeInicial: "",
    profundidadeFinal: "",
    alvo: "",
    estante: "",
    prateleira: "",
  };
  secoes = [];
  secoesMolhadas = [];
  imagens?: any[] = [];
  caixasSecasImages!: any[];
  caixasMolhadasImages!: any[];
  combineImagens?: any[];
  project!: ProjetoModel;
  projects!: ProjetoModel[];
  holeId!: string;
  boxId!: string;
  boxes!: any[];
  caixasMapeadas!: any;
  currentBoxIndex: number = 0;
  boxNames: any;

  constructor(
    private _router: Router,
    private _projectService: ProjetoService,
    private _boxService: BoxService,
    private _targetService: TargetService,
    private _holeService: HoleService,
    private _activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe((params) => {
      if (params["projeto"]) {
        this.getTargetInfo(params["projeto"]);
        this.getProjectById(params["projeto"]);
      }
    });
  }

  getProjectById(id: string): void {
    this._projectService.getById(id).subscribe((res) => {
      this.project = res;
      this.formData.nome = this.project.nome;
      this.formData.municipio = "Não informado";
      this.formData.localidade = this.project.localidade;
      this.formData.pavilhao = "1";
      this.formData.alvo = this.project.alvos[0]?.nome || "Sem alvo";
    });
  }

  getTargetInfo(projectId: string) {
    this._targetService
      .getTargetForProjectId(projectId)
      .subscribe((target: any) => {
        this.holeId = target[0]?.furos[0]?.id;
        this.getBoxesByHoleId(this.holeId);
      });
  }

  getBoxesByHoleId(holeId: string) {
    this._boxService.getBoxByHoleId(holeId).subscribe((res) => {
      this.boxes = Array.isArray(res) ? res : [res];

      const groupedBoxes: {
        [key: string]: { name: string; boxes: BoxModel[] };
      } = this.boxes.reduce((acc, box) => {
        const boxName = box.nome;
        if (!acc[boxName]) {
          acc[boxName] = { name: boxName, boxes: [] };
        }
        acc[boxName].boxes.push(box);
        return acc;
      }, {});

      const sortedKeys = Object.keys(groupedBoxes).sort((a, b) => {
        return a.localeCompare(b);
      });

      const sortedGroupedBoxes = sortedKeys.reduce(
        (acc, key) => {
          acc[key] = groupedBoxes[key];
          return acc;
        },
        {} as { [key: string]: { name: string; boxes: BoxModel[] } },
      );

      this.caixasMapeadas = sortedGroupedBoxes;
      this.boxNames = sortedKeys;

      this.currentBoxIndex = 0;
      const currentBoxName = this.boxNames[this.currentBoxIndex];
      const boxIds = this.caixasMapeadas[currentBoxName]?.boxes.map(
        (x: any) => {
          return x.id;
        },
      );

      if (boxIds && boxIds.length > 0) {
        const categoriaIds = this.caixasMapeadas[currentBoxName]?.boxes.map(
          (x: any) => {
            return x.categoriaId;
          },
        );
        boxIds.forEach((boxId: string) => {
          categoriaIds.forEach((categoriaId: number) => {
            return this.getBoxById(boxId, categoriaId);
          });
        });
      }
    });
  }

  navigateBox(direction: number) {
    const newIndex = this.currentBoxIndex + direction;
    if (newIndex >= 0 && newIndex < this.boxNames.length) {
      this.currentBoxIndex = newIndex;
      const currentBoxName = this.boxNames[this.currentBoxIndex];
      const boxIds = this.caixasMapeadas[currentBoxName]?.boxes.map(
        (x: any) => {
          return x.id;
        },
      );

      if (boxIds && boxIds.length > 0) {
        const categoriaIds = this.caixasMapeadas[currentBoxName]?.boxes.map(
          (x: any) => {
            return x.categoriaId;
          },
        );
        boxIds.forEach((boxId: string) => {
          categoriaIds.forEach((categoriaId: number) => {
            return this.getBoxById(boxId, categoriaId);
          });
        });
      } else {
        console.warn(`Nenhuma caixa encontrada para o nome: ${currentBoxName}`);
      }
    }
  }

  getBoxById(id: string, categoriaId: number) {
    this._boxService.getById(id).subscribe(
      (res) => {
        this.formData.profundidadeInicial = res.profundidadeInicial;
        this.formData.profundidadeFinal = res.profundidadeFinal;
        this.formData.estante = res.estante;
        this.formData.prateleira = res.prateleira;

        if (categoriaId === 1) {
          this.caixasSecasImages = Array.isArray(res.capturas)
            ? res.capturas
                .map((x) => {
                  const imageUrl = x.miniatureReference
                    ? `http://cbpmged.renova.net.br/${x.miniatureReference.replace(/\\/g, "/")}`
                    : null;
                  if (imageUrl) {
                    return { url: imageUrl, secao: x.secao };
                  }
                  return null;
                })
                .filter((item) => {
                  return item !== null;
                })
                .sort((a, b) => {
                  return (a.secao ?? 0) - (b.secao ?? 0);
                })
            : [];
        } else if (categoriaId === 2) {
          this.caixasMolhadasImages = Array.isArray(res.capturas)
            ? res.capturas
                .map((x) => {
                  const imageUrl = x.miniatureReference
                    ? `http://cbpmged.renova.net.br/${x.miniatureReference.replace(/\\/g, "/")}`
                    : null;
                  if (imageUrl) {
                    return { url: imageUrl, secao: x.secao };
                  }
                  return null;
                })
                .filter((item) => {
                  return item !== null;
                })
                .sort((a, b) => {
                  return (a.secao ?? 0) - (b.secao ?? 0);
                })
            : [];
        } else {
          console.warn(
            `Categoria desconhecida para a caixa com ID ${id}: ${categoriaId}`,
          );
        }

        this.combineImagens = [
          ...this.caixasSecasImages,
          ...this.caixasMolhadasImages,
        ];
        console.log("combineImagens", this.combineImagens);
      },
      (err) => {
        console.error(`Erro ao buscar detalhes da caixa com ID ${id}:`, err);
      },
    );
  }

  back() {
    window.history.back();
  }
}
