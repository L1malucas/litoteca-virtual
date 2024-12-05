import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CaixaModel } from "@models/caixa.model";
import { CapturaModel } from "@models/captura.model";
import { CaixaService } from "@services/caixa.service";
import { FuroService } from "@services/furo.service";
import { DownloadService } from "@services/system/download.service";
import { Toast } from "@services/system/toast.service";

@Component({
  selector: "app-secao",
  templateUrl: "./secao.component.html",
  styleUrls: ["./secao.component.scss"],
})
export class SecaoComponent implements OnInit {
  caixasAtuais: CaixaModel[] = []; // Caixas exibidas no momento
  caixa: CaixaModel = new CaixaModel();
  caixaAtual: number = 0; // Índice da caixa atual exibida
  caixasAgrupadas: CaixaModel[][] = []; // Caixas agrupadas por nome
  caixasSecasImages: any[] = [];
  caixasMolhadasImages: any[] = [];
  capturas: CapturaModel[] = [];
  capturaAtual: CapturaModel = new CapturaModel();
  separadorAtual: number = 0;
  furoInfo: any = {};

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _downloadService: DownloadService,
    private _caixaService: CaixaService,
    private _furoService: FuroService,
    private _toast: Toast,
  ) {}

  ngOnInit() {
    this.getEntityByRoute();
  }

  // Método para buscar caixas por furo
  getEntityByRoute() {
    const furo = this._route.snapshot.queryParams["furo"];
    this._furoService.getFurosWithParams({ id: furo }).subscribe((furo) => {
      this.furoInfo = furo.data[0];
    });
    this._caixaService.buscarCaixaPorFuro(furo).subscribe((caixas) => {
      // ordenar caixas por nome
      caixas = this.ordenarCaixasPorNome(caixas);

      // receber as caixas agrupadas por nome
      const caixasAgrupadasObj = this.juntarCaixasPorNome(caixas);
      this.caixasAgrupadas = Object.values(caixasAgrupadasObj).map((group) => {
        return [...group.secas, ...group.molhadas];
      });

      // Exibir a primeira caixa se houver
      if (this.caixasAgrupadas.length > 0) {
        this.setCaixaAtual(0);
      }
    });
  }

  // Método para juntar caixas por nome e separar por seca e molhada
  juntarCaixasPorNome(caixas: CaixaModel[]) {
    const caixasAgrupadas: {
      [key: string]: { secas: CaixaModel[]; molhadas: CaixaModel[] };
    } = {};

    caixas.forEach((caixa) => {
      if (!caixasAgrupadas[caixa.nome]) {
        caixasAgrupadas[caixa.nome] = { secas: [], molhadas: [] };
      }

      if (caixa.categoriaId === 1) {
        this.caixasSecasImages = Array.isArray(caixa.capturas)
          ? caixa.capturas
          : [];
        caixasAgrupadas[caixa.nome].secas.push(caixa);
      } else if (caixa.categoriaId === 2) {
        this.caixasMolhadasImages = Array.isArray(caixa.capturas)
          ? caixa.capturas
          : [];
        caixasAgrupadas[caixa.nome].molhadas.push(caixa);
      }

      caixa.capturas = this.ordenarCapturasPorSecao(caixa.capturas);
      caixa.capturas.forEach((captura) => {
        captura.miniatureReference = this.getMiniatureUrl(
          captura.miniatureReference,
        );
        captura.imageReference = this.getMiniatureUrl(captura.imageReference);
      });
    });

    const sortedKeys = Object.keys(caixasAgrupadas).sort((a, b) => {
      return a.localeCompare(b);
    });
    const sortedGroupedBoxes = sortedKeys.reduce(
      (acc, key) => {
        acc[key] = caixasAgrupadas[key];
        return acc;
      },
      {} as { [key: string]: { secas: CaixaModel[]; molhadas: CaixaModel[] } },
    );

    return sortedGroupedBoxes;
  }

  // Método para modificar url das miniaturas
  // Exemplo: LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  // => https://cbpmged.renova.app.br/LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  getMiniatureUrl(miniatureReference: string) {
    return `https://cbpmged.renova.app.br/${miniatureReference}`;
  }

  // Método para ordenar caixas por nome
  ordenarCaixasPorNome(caixas: CaixaModel[]) {
    return caixas.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }

  // Método para ordenar capturas por secao
  // Exemplo: [Captura1, Captura2, Captura3] => [Captura1, Captura2, Captura3]
  ordenarCapturasPorSecao(capturas: CapturaModel[]) {
    // Remover secao 0 e retornar capturas ordenadas por secao
    capturas = capturas.filter((captura) => {
      return captura.secao !== 0;
    });
    return capturas.sort((a, b) => {
      return a.secao - b.secao;
    });
  }

  // Definir a caixa atual com base no índice
  // Exemplo: [0:{Caixa1, Caixa1}, 1:{Caixa2}, 2:{Caixa3, Caixa3}]
  setCaixaAtual(index: number) {
    this.caixasAtuais = this.caixasAgrupadas[index];
    this.caixaAtual = index;
    this.setCaixaMolhadaOuSeca(1);
  }

  // Método para definir a caixa molhada ou seca
  setCaixaMolhadaOuSeca(categoriaId: number) {
    const caixa = this.caixasAtuais.find((caixa) => {
      return caixa.categoriaId === categoriaId;
    });
    if (caixa) {
      this.setCaixaSelecionada(caixa);
    } else {
      this._toast.info("Nenhuma caixa encontrada.");
    }
  }

  // Método para definir o separador atual
  setSeparator(separador: number) {
    this.separadorAtual = separador;
  }

  // Navegar para a próxima caixa
  proximaCaixa() {
    if (this.caixaAtual < this.caixasAgrupadas.length - 1) {
      this.setCaixaAtual(this.caixaAtual + 1);
    } else {
      this._toast.info("Já está na última caixa.");
    }
  }

  // Definir caixa selecionada entre seca e molhada
  // Exemplo: [Caixa1, Caixa1] => Caixa1[Seca, Molhada]
  setCaixaSelecionada(caixa: CaixaModel) {
    this.caixa = caixa;
    this.capturas = caixa.capturas;
    this.setCapturaAtual(caixa.capturas[0]);
  }

  // Navegar para a caixa anterior
  caixaAnterior() {
    if (this.caixaAtual > 0) {
      this.setCaixaAtual(this.caixaAtual - 1);
    } else {
      this._toast.info("Já está na primeira caixa.");
    }
  }

  // Definir captura selecionada, a primeira captura já deve vir selecionada
  setCapturaAtual(index: any) {
    this.capturaAtual = index;
  }

  // Navegar para a captura anterior
  capturaAnterior() {
    const currentIndex = this.capturas.findIndex((captura) => {
      return captura === this.capturaAtual;
    });
    if (currentIndex > 0) {
      this.setCapturaAtual(this.capturas[currentIndex - 1]);
    } else {
      this._toast.info("Já está na primeira captura.");
    }
  }

  // Navegar para a próxima captura
  proximaCaptura() {
    const currentIndex = this.capturas.findIndex((captura) => {
      return captura === this.capturaAtual;
    });
    if (currentIndex !== -1 && currentIndex < this.capturas.length - 1) {
      this.setCapturaAtual(this.capturas[currentIndex + 1]);
    } else {
      this._toast.info("Já está na última captura.");
    }
  }

  // Método para fazer download de imagem
  downloadImage() {
    this._downloadService.downloadImage(this.capturaAtual.imageReference);
  }

  // Método para retornar à página de consulta de projeto
  goConsultaProjeto() {
    this._router.navigate(["/consultar-regiao-filtro/"]);
  }
}
