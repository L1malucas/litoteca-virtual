import { Component } from "@angular/core";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.scss",
})
export class GalleryComponent {
  secoes = [
    { numero: 1, imagem: "assets/seca01.png" },
    { numero: 2, imagem: "assets/seca02.png" },
    { numero: 3, imagem: "assets/seca02.png" },
    { numero: 4, imagem: "assets/seca02.png" },
    { numero: 5, imagem: "assets/seca02.png" },
    { numero: 6, imagem: "assets/seca02.png" },
    { numero: 7, imagem: "assets/seca02.png" },
  ];

  secoesMolhadas = [
    { numero: 1, imagem: "assets/molhada01.png" },
    { numero: 2, imagem: "assets/molhada02.png" },
    { numero: 3, imagem: "assets/seca02.png" },
    { numero: 4, imagem: "assets/seca02.png" },
    { numero: 5, imagem: "assets/seca02.png" },
    { numero: 6, imagem: "assets/seca02.png" },
    { numero: 7, imagem: "assets/seca02.png" },
  ];

  imagens = [
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
    "http://cbpmged.renova.net.br/SistemaDiamondMiniaturas/thumbnail_t638645168049699313-SECA-Placa.jpg",
  ];

  projetos = [];
}
