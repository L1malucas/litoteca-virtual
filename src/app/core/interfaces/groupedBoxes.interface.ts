export interface GroupedBoxes {
  seca: {
    nome: string;
    estante: string;
    prateleira: string;
    profundidadeInicial: string;
    profundidadeFinal: string;
    id: string;
    categoriaId: number;
    capturas: {
      id: string;
      secao: number;
      imageReference: string;
      miniatureReference: string;
    }[];
  }[];
  molhada: {
    nome: string;
    estante: string;
    prateleira: string;
    profundidadeInicial: string;
    profundidadeFinal: string;
    id: string;
    categoriaId: number;
    capturas: {
      id: string;
      secao: number;
      imageReference: string;
      miniatureReference: string;
    }[];
  }[];
}
