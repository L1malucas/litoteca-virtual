import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpConfig } from "@config/help-config";
import { CaixaModel } from "@models/caixa.model";
import { CapturaModel } from "@models/captura.model";
import { GroupedBoxes } from "src/app/core/interfaces/groupedBoxes.interface";
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
  caixasAgrupadas: GroupedBoxes[] = []; // Caixas agrupadas por nome
  caixa: any;
  caixaAtual: any;
  secaoAtual: any;
  separadorAtual: number = 0;
  furoInfo: any = {};
  lupaSize: number = 250;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _downloadService: DownloadService,
    private _caixaService: CaixaService,
    private _furoService: FuroService,
    private _toast: Toast,
    private _helpConfig: HelpConfig,
  ) {}

  ngOnInit() {
    this.getEntityByRoute();
  }

  ngAfterViewInit() {
    console.log(this.caixaAtual);
  }

  // Método para buscar informações do furo
  getFuroInfo(furo: string) {
    this._furoService.getFurosWithParams({ id: furo }).subscribe((furo) => {
      this.furoInfo = furo.data[0];
    });
  }

  // Método para buscar caixas por furo
  getEntityByRoute() {
    const furo = this._route.snapshot.queryParams["furo"];
    const caixa = this._route.snapshot.queryParams["caixa"];
    const secao = this._route.snapshot.queryParams["secao"];

    if (furo) {
      this.getFuroInfo(furo);
    }

    this._caixaService.buscarCaixaPorFuro(furo).subscribe((data) => {
      // ordenar caixas por nome
      data = this.ordenarCaixasPorNome(data);

      // receber as caixas agrupadas por nome
      const caixasAgrupadasObj = this.groupBoxes(data);
      this.caixasAgrupadas = caixasAgrupadasObj;

      // Exibir a caixa selecionada se houver
      if (caixa) {
        this.setCaixaAtual(caixa);
        this.setSecaoAtual(secao);
      }
    });
  }

  // Método para modificar url das miniaturas
  // Exemplo: LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  // => https://cbpmged.renova.app.br/LitotecaMiniatures/b717d4aa-926d-4984-ae4c-0a8687cd8c10-MOLHADA-6.jpg
  getMiniatureUrl(miniatureReference: string) {
    return `${this._helpConfig.FTP_URL}/${miniatureReference}`;
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

  // Definir a caixa atual com base no id
  setCaixaAtual(index: string) {
    this.caixasAgrupadas.forEach((caixa) => {
      const seca = caixa.seca.find((captura) => {return captura.id === index});
      const molhada = caixa.molhada.find((captura) => {return captura.id === index});

      if (seca) {
        this.caixa = seca;
        this.caixaAtual = seca;
      } else if (molhada) {
        this.caixa = molhada;
        this.caixaAtual = molhada;
      }
    });
  }

  // Método para definir a caixa molhada ou seca com base na categoriaId
  setCaixaMolhadaOuSeca(categoriaId: number) {
    if (categoriaId === 1) {
      this.caixaAtual = this.caixa.seca;
    } else if (categoriaId === 2) {
      this.caixaAtual = this.caixa.molhada;
    }
  }

  // Método para definir o separador atual
  setSeparator(separador: number) {
    this.separadorAtual = separador;
  }

  // Navegar para a próxima caixa
  proximaCaixa() {}

  // Navegar para a caixa anterior
  caixaAnterior() {}

  // Definir captura selecionada, a primeira captura já deve vir selecionada
  setSecaoAtual(index: any) {
    if (index) {
      this.secaoAtual = this.caixa.capturas.find(
        (captura: any) => {return captura.id === index},
      );
    }
  }

  // Navegar para a captura anterior
  capturaAnterior() {}

  // Navegar para a próxima captura
  proximaCaptura() {}

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
  downloadImage() {}

  // Método para retornar à página de consulta de projeto
  goConsultaProjeto() {
    window.history.back();
  }

  // Método para agrupar caixas por nome e separar por seca e molhada segundo a interface GroupedBoxes
  groupBoxes(caixas: CaixaModel[]): GroupedBoxes[] {
    const groupedBoxesMap = new Map<string, GroupedBoxes>();

    caixas.forEach((caixa) => {
      // Inicializa o grupo para o nome da caixa, se necessário
      if (!groupedBoxesMap.has(caixa.nome)) {
        groupedBoxesMap.set(caixa.nome, {
          seca: [],
          molhada: [],
        });
      }

      const currentGroup = groupedBoxesMap.get(caixa.nome)!;

      // Determina o tipo da caixa (seca ou molhada) e adiciona as capturas
      const targetArray =
        caixa.categoriaId === 1 ? currentGroup.seca : currentGroup.molhada;

      let existingEntry = targetArray.find((entry) => {return entry.id === caixa.id});

      if (!existingEntry) {
        existingEntry = {
          id: caixa.id,
          categoriaId: caixa.categoriaId,
          nome: caixa.nome,
          estante: caixa.estante,
          prateleira: caixa.prateleira,
          profundidadeInicial: caixa.profundidadeInicial,
          profundidadeFinal: caixa.profundidadeFinal,
          capturas: [],
        };
        targetArray.push(existingEntry);
      }

      // Adiciona todas as capturas ao respectivo grupo
      existingEntry.capturas.push(
        ...caixa.capturas.map((captura) => {return {
          id: captura.id,
          secao: captura.secao,
          imageReference: this.getMiniatureUrl(captura.imageReference),
          miniatureReference: this.getMiniatureUrl(captura.miniatureReference),
        }}),
      );
      // Ordena as capturas pela propriedade `secao`
      existingEntry.capturas.sort((a, b) => {return b.secao - a.secao});
    });

    // Converte o mapa em um array de GroupedBoxes
    return Array.from(groupedBoxesMap.values());
  }
}
