import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HelpConfig } from "@config/help-config";
import { CaixaModel } from "@models/caixa.model";
import { CapturaModel } from "@models/captura.model";
import {
  GroupedBoxes,
  Captura,
  Secao,
} from "src/app/core/interfaces/groupedBoxes.interface";
import { FuroService } from "@services/furo.service";
import { DownloadService } from "@services/system/download.service";
import { Toast } from "@services/system/toast.service";

@Component({
  selector: "app-secao",
  templateUrl: "./secao.component.html",
  styleUrls: ["./secao.component.scss"],
})
export class SecaoComponent implements OnInit, AfterViewInit {
  caixasAgrupadas: GroupedBoxes[] = []; // Caixas agrupadas por nome
  caixasPorFuro: any;
  caixa: any;
  caixaAtual: any;
  capturaAtual: any;
  secaoAtual: any;
  separadorAtual: number = 0;
  furoInfo: any = {};
  lupaSize: number = 250;

  constructor(
    private _route: ActivatedRoute,
    private _downloadService: DownloadService,
    private _furoService: FuroService,
    private _toast: Toast,
    private _helpConfig: HelpConfig,
  ) {}

  ngOnInit() {
    this.getFuroInfo();
    this.getEntityByRoute();
  }

  ngAfterViewInit() {}

  // Método para buscar informações do furo
  getFuroInfo() {
    const furo = this._route.snapshot.queryParams["furo"];
    this._furoService.getFurosWithParams({ id: furo }).subscribe((furo) => {
      this.furoInfo = furo.data[0];
    });
  }

  // Método para buscar caixas por furo
  getEntityByRoute() {
    this.caixasPorFuro = this._route.snapshot.data["caixas"];
    this.caixasPorFuro = this.ordenarCaixasPorNome(this.caixasPorFuro);
    this.caixasAgrupadas = this.groupBoxes(this.caixasPorFuro);

    const caixa: string = this._route.snapshot.queryParams["caixa"];
    const categoria: number = this._route.snapshot.queryParams["categoria"];
    const secao: number = this._route.snapshot.queryParams["secao"];

    this.setCaixaAtual(caixa);
    this.setCapturaAtual(categoria);
    this.setSecaoAtual(secao);
  }

  // Método para modificar url das miniaturas
  // Exemplo: LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  // => https://cbpmged.renova.app.br/LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  getMiniatureUrl(miniatureReference: string) {
    return `${this._helpConfig.FTP_URL}${miniatureReference}`;
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
    return capturas.sort((a, b) => {
      return a.secao - b.secao;
    });
  }

  // Definir a caixa atual com base no nome
  setCaixaAtual(nome: string) {
    this.caixaAtual = this.caixasAgrupadas.find((caixa: GroupedBoxes) => {
      return caixa.nome === nome;
    });
  }

  // Método para definir a caixa molhada ou seca com base na categoriaId
  // Exemplo: 1 => Seca, 2 => Molhada
  setCapturaAtual(categoria: number) {
    this.capturaAtual = this.caixaAtual.capturas.filter((captura: Captura) => {
      return captura.categoriaId === Number(categoria);
    });
  }

  // Definir captura atual com base na categoriaId
  setSecaoAtual(secao: number) {
    this.secaoAtual = this.capturaAtual[0].secoes.filter((item: Secao) => {
      return item.secao === Number(secao);
    });
  }

  // Método para definir o separador atual
  setSeparator(separador: number) {
    this.separadorAtual = separador;
  }

  // Navegar para a próxima caixa
  proximaCaixa() {
    const index = this.caixasAgrupadas.findIndex((caixa: any) => {
      return caixa.nome === this.caixaAtual.nome;
    });
    if (index < this.caixasAgrupadas.length - 1) {
      this.caixaAtual = this.caixasAgrupadas[index + 1];
      this.setCapturaAtual(1);
      this.setSecaoAtual(1);
    } else {
      this._toast.info("Última caixa.");
    }
  }

  // Navegar para a caixa anterior
  caixaAnterior() {
    const index = this.caixasAgrupadas.findIndex((caixa: any) => {
      return caixa.nome === this.caixaAtual.nome;
    });
    if (index > 0) {
      this.caixaAtual = this.caixasAgrupadas[index - 1];
      this.setCapturaAtual(1);
      this.setSecaoAtual(1);
    } else {
      this._toast.info("Primeira caixa.");
    }
  }

  // Navegar para a seção anterior baseada no número da seção
  capturaAnterior() {
    const index = this.capturaAtual[0].secoes.find((secao: any) => {
      return secao.secao === this.secaoAtual[0].secao;
    }).secao;
    if (index > 0) {
      this.secaoAtual = this.capturaAtual[0].secoes.filter((secao: any) => {
        return secao.secao === index - 1;
      });
    } else {
      this._toast.info("Primeira seção.");
    }
  }

  // Navegar para a próxima seção baseada no número da seção
  proximaCaptura() {
    const index = this.capturaAtual[0].secoes.find((secao: any) => {
      return secao.secao === this.secaoAtual[0].secao;
    }).secao;
    if (index < this.capturaAtual[0].secoes.length - 1) {
      this.secaoAtual = this.capturaAtual[0].secoes.filter((secao: any) => {
        return secao.secao === index + 1;
      });
    } else {
      this._toast.info("Última seção.");
    }
  }

  // Metodo para aumentar o tamanho da lupa
  aumentarLupa() {
    if (this.lupaSize >= 450) {
      this._toast.info("Tamanho máximo da lupa atingido.");
      return;
    }
    this.lupaSize += 50;
  }

  // Método para resetar o tamanho da lupa
  resetarLupa() {
    this.lupaSize = 250;
  }

  // Metodo para diminuir o tamanho da lupa
  diminuirLupa() {
    if (this.lupaSize <= 250) {
      this._toast.info("Tamanho mínimo da lupa atingido.");
      return;
    }
    this.lupaSize -= 50;
  }

  // Método para fazer download de imagem
  downloadImage() {
    this._downloadService.downloadImage(this.secaoAtual[0].imageReference);
  }

  // Método para retornar à página de consulta de projeto
  goConsultaProjeto() {
    window.history.back();
  }

  // Método para agrupar caixas por nome e separar por seca e molhada segundo a interface GroupedBoxes
  groupBoxes(data: any[]): GroupedBoxes[] {
    const grouped: GroupedBoxes[] = [];

    data.forEach((item) => {
      let group = grouped.find((g) => {
        return g.nome === item.nome;
      });
      if (!group) {
        group = {
          id: item.id,
          nome: item.nome,
          estante: item.estante,
          prateleira: item.prateleira,
          profundidadeInicial: item.profundidadeInicial,
          profundidadeFinal: item.profundidadeFinal,
          capturas: [],
        };
        grouped.push(group);
      }
      group.capturas.push({
        categoriaId: item.categoriaId,
        secoes: item.capturas,
      });
      // Ordenar capturas por categoriaId
      group.capturas = group.capturas.sort((a, b) => {
        return a.categoriaId - b.categoriaId;
      });
      // Ordenar capturas por secao
      group.capturas.forEach((captura) => {
        captura.secoes = captura.secoes.sort((a, b) => {
          return a.secao - b.secao;
        });
      });

      // Alterar url das miniaturas
      group.capturas.forEach((captura) => {
        captura.secoes.forEach((secao) => {
          secao.imageReference = this.getMiniatureUrl(secao.imageReference);
          secao.miniatureReference = this.getMiniatureUrl(
            secao.miniatureReference,
          );
        });
      });
    });

    return grouped;
  }
}
