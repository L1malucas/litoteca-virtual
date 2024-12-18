export interface GroupedBoxes {
  id: string;
  nome: string;
  estante: string;
  prateleira: string;
  profundidadeInicial: string;
  profundidadeFinal: string;
  capturas: {
    categoriaId: number;
    secoes: {
      id: string;
      secao: number;
      imageReference: string;
      miniatureReference: string;
    }[];
  }[];
}

export interface Captura {
  categoriaId: number;
  secao: {
    id: string;
    secao: number;
    imageReference: string;
    miniatureReference: string;
  }[];
}

export interface Secao {
  id: string;
  secao: number;
  imageReference: string;
  miniatureReference: string;
}
