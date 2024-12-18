import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpConfig } from "@config/help-config";
import { AlvoModel } from "@models/alvo.model";
import { CaixaModel } from "@models/caixa.model";
import { FuroModel } from "@models/furo.model";
import { ProjetoModel } from "@models/projeto.model";
import { TargetService } from "@services/alvo.service";
import { CaixaService } from "@services/caixa.service";
import { FuroService } from "@services/furo.service";
import { ProjetoService } from "@services/projeto.service";
import { Toast } from "@services/system/toast.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.scss",
})
export class GalleryComponent {
  private _toast = inject(Toast);
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
  caixasSecasImages: any[] = [];
  caixasMolhadasImages: any[] = [];
  combineImagens?: any[];
  projeto?: ProjetoModel;
  furoId!: string;
  caixaId!: string;
  caixas!: any[];
  caixasMapeadas!: any;
  currentBoxIndex: number = 0;
  nomeCaixas: any;
  target!: AlvoModel;
  furo?: FuroModel;

  constructor(
    private _router: Router,
    private _projetoService: ProjetoService,
    private _caixaService: CaixaService,
    private _alvoService: TargetService,
    private _furoService: FuroService,
    private _activeRoute: ActivatedRoute,
    private _helpConfig: HelpConfig,
  ) {}

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe((params) => {
      if (params["projeto"]) {
        this.buscarInformacoesDoAlvo(params["alvo"]);
        this.buscarInformacoesDoFuro(params["furo"]);
        this.buscarCaixasPorFuroId(params["furo"]);
        this.buscarPorjetoPorId(params["projeto"]);
      }
    });
  }

  buscarPorjetoPorId(id: string): void {
    this._projetoService.getById(id).subscribe((res) => {
      this.projeto = res;
      this.formData.nome = this.projeto.nome;
      this.formData.municipio = "NÃO INFORMADO";
      this.formData.localidade = this.projeto.localidade;
      this.formData.pavilhao = "1";
      this.formData.alvo = this.projeto.alvos[0]?.nome || "Sem alvo";
    });
  }

  buscarInformacoesDoFuro(furoId: string) {
    this._furoService.getById(furoId).subscribe((res) => {
      this.furo = res;
      this.furoId = furoId;
      this.formData.furo = this.furo?.nome;
    });
  }

  buscarInformacoesDoAlvo(alvoId: string) {
    this._alvoService.buscarAlvoPorId(alvoId).subscribe((target: any) => {
      this.target = target;
    });
  }

  buscarCaixasPorFuroId(furoId: string) {
    this._caixaService.buscarCaixaPorFuro(furoId).subscribe((res) => {
      this.caixas = Array.isArray(res) ? res : [res];

      const groupedBoxes: {
        [key: string]: { name: string; boxes: CaixaModel[] };
      } = this.caixas.reduce((acc, box) => {
        const boxName = box.nome;
        if (!acc[boxName]) {
          acc[boxName] = { name: boxName, boxes: [] };
        }
        acc[boxName].boxes.push(box);
        return acc;
      }, {});

      const sortedKeys = Object.keys(groupedBoxes).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
        return numA - numB;
      });

      const sortedGroupedBoxes = sortedKeys.reduce(
        (acc, key) => {
          acc[key] = groupedBoxes[key];
          return acc;
        },
        {} as { [key: string]: { name: string; boxes: CaixaModel[] } },
      );

      this.caixasMapeadas = sortedGroupedBoxes;
      this.nomeCaixas = sortedKeys;

      this.currentBoxIndex = 0;
      const currentBoxName = this.nomeCaixas[this.currentBoxIndex];
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
        boxIds.forEach((boxId: string, index: number) => {
          const categoriaId = categoriaIds[index];
          this.buscarCaixaPorId(boxId, categoriaId);
        });
      }
    });
  }

  navegacaoPorCaixa(direction: number) {
    const newIndex = this.currentBoxIndex + direction;

    if (newIndex >= this.nomeCaixas.length) {
      this._toast.info("Atenção", "Você já está na última caixa!");
      return;
    }

    if (newIndex < 0) {
      this._toast.info("Atenção", "Você já está na primeira caixa!");
      return;
    }

    this.currentBoxIndex = newIndex;
    const currentBoxName = this.nomeCaixas[this.currentBoxIndex];
    const boxIds = this.caixasMapeadas[currentBoxName]?.boxes.map((x: any) => {
      return x.id;
    });

    if (boxIds && boxIds.length > 0) {
      const categoriaIds = this.caixasMapeadas[currentBoxName]?.boxes.map(
        (x: any) => {
          return x.categoriaId;
        },
      );
      boxIds.forEach((boxId: string, index: number) => {
        const categoriaId = categoriaIds[index];
        this.buscarCaixaPorId(boxId, categoriaId);
      });
    } else {
      console.warn(`Nenhuma caixa encontrada para o nome: ${currentBoxName}`);
    }
  }

  buscarCaixaPorId(id: string, categoriaId: number) {
    this._caixaService.buscarCaixaPorId(id).subscribe(
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
                    ? `${this._helpConfig.FTP_URL}${x.miniatureReference.replace(/\\/g, "/")}`
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
                  return (b.secao ?? 0) - (a.secao ?? 0);
                })
            : [];
        } else if (categoriaId === 2) {
          this.caixasMolhadasImages = Array.isArray(res.capturas)
            ? res.capturas
                .map((x) => {
                  const imageUrl = x.miniatureReference
                    ? `${this._helpConfig.FTP_URL}${x.miniatureReference.replace(/\\/g, "/")}`
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
                  return (b.secao ?? 0) - (a.secao ?? 0);
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
      },
      (err) => {
        console.error(`Erro ao buscar detalhes da caixa com ID ${id}:`, err);
      },
    );
  }

  voltar() {
    window.history.back();
  }

  navegarParSecao(furoId: string) {
    this._router.navigate(["/secao"], {
      queryParams: { furo: furoId },
    });
  }
}
