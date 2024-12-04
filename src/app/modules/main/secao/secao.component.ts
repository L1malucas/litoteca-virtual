import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CaixaModel } from "@models/caixa.model";
import { CapturaModel } from "@models/captura.model";
import { CaixaService } from "@services/caixa.service";
import { DownloadService } from "@services/system/download.service";

@Component({
  selector: "app-secao",
  templateUrl: "./secao.component.html",
  styleUrls: ["./secao.component.scss"],
})
export class SecaoComponent implements OnInit, AfterViewInit {
  caixasAtuais: CaixaModel[] = []; // Caixas exibidas no momento
  caixa: CaixaModel = new CaixaModel();
  caixaAtual: number = 0; // Índice da caixa atual exibida
  caixasAgrupadas: CaixaModel[][] = []; // Caixas agrupadas por nome
  capturas: CapturaModel[] = [];
  capturaAtual: CapturaModel = new CapturaModel();
  separadorAtual: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _downloadService: DownloadService,
    private _caixaService: CaixaService,
  ) {}

  ngOnInit() {
    this.getEntityByRoute();
  }

  ngAfterViewInit() {}

  // Método para buscar caixas por furo
  getEntityByRoute() {
    const furo = this._route.snapshot.queryParams["furo"];
    this._caixaService.buscarCaixaPorFuro(furo).subscribe((caixas) => {
      // ordenar caixas por nome
      caixas = this.ordenarCaixasPorNome(caixas);
      // receber as caixas agrupadas por nome
      this.caixasAgrupadas = this.juntarCaixasPorNome(caixas);

      // Exibir a primeira caixa se houver
      if (this.caixasAgrupadas.length > 0) {
        this.setCaixaAtual(0);
      }
    });
  }

  // metoro para criar novo array e agrupar duas caixas com mesmo nome, cada um com seu indice
  // Exemplo: [Caixa1, Caixa1, Caixa2, Caixa3, Caixa3] => [Caixa1:{Caixa1, Caixa1}, Caixa2:{Caixa2}, Caixa3:{Caixa3, Caixa3}]
  juntarCaixasPorNome(caixas: CaixaModel[]) {
    const caixasAgrupadas: { [key: string]: CaixaModel[] } = {};
    const caixaAtual: CaixaModel[][] = [];
    caixas.forEach((caixa) => {
      caixa.capturas = this.ordenarCapturasPorSecao(caixa.capturas);
      caixa.capturas.forEach((captura) => {
        captura.miniatureReference = this.getMiniatureUrl(
          captura.miniatureReference,
        );
        captura.imageReference = this.getMiniatureUrl(captura.imageReference);
      });
      if (!caixasAgrupadas[caixa.nome]) {
        caixasAgrupadas[caixa.nome] = [];
      }
      caixasAgrupadas[caixa.nome].push(caixa);
    });
    for (const key in caixasAgrupadas) {
      caixaAtual.push(caixasAgrupadas[key]);
    }
    return caixaAtual;
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
    console.log("Caixas atuais: ", this.caixasAtuais);
    this.caixaAtual = index;
    console.log("Caixa atual: ", this.caixaAtual);
    this.setCaixaMolhadaOuSeca(0);
  }

  // Método para definir a caixa molhada ou seca
  setCaixaMolhadaOuSeca(index: number) {
    this.caixa = this.caixasAtuais[index];
    console.log("Caixa: ", this.caixa);
    this.capturas = this.caixa.capturas;
  }

  // Método para definir o separador atual
  setSeparator(separador: number) {
    this.separadorAtual = separador;
    console.log("Separador atual: ", this.separadorAtual);
  }

  // Navegar para a próxima caixa
  proximaCaixa() {
    if (this.caixaAtual < this.caixasAgrupadas.length - 1) {
      this.setCaixaAtual(this.caixaAtual + 1);
    } else {
      console.log("Já está na última caixa.");
    }
  }

  // Definir caixa selecionada entre seca e molhada
  // Exemplo: [Caixa1, Caixa1] => Caixa1[Seca, Molhada]
  setCaixaSelecionada(caixa: CaixaModel) {
    this.caixa = caixa;
    this.capturas = caixa.capturas;
  }

  // Navegar para a caixa anterior
  caixaAnterior() {
    if (this.caixaAtual > 0) {
      this.setCaixaAtual(this.caixaAtual - 1);
    } else {
      console.log("Já está na primeira caixa.");
    }
  }

  // Definir captura selecionada
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
      console.log("Já está na primeira captura.");
    }
    console.log("Captura anterior");
  }

  // Navegar para a próxima captura
  proximaCaptura() {
    const currentIndex = this.capturas.findIndex((captura) => {
      return captura === this.capturaAtual;
    });
    if (currentIndex !== -1 && currentIndex < this.capturas.length - 1) {
      this.setCapturaAtual(this.capturas[currentIndex + 1]);
    }
    console.log("Próxima captura");
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
