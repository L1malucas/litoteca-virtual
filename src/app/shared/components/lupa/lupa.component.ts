import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-lupa",
  templateUrl: "./lupa.component.html",
  styleUrls: ["./lupa.component.scss"],
})
export class LupaComponent implements OnInit, AfterViewInit {
  // Tamanho da lupa em pixels
  @Input() lupaSize: number = 0;

  // Fator de desfoque (zoom)
  lupaDesfoque: number = 2;

  // Dimensões da imagem original
  imageWidth = 0;
  imageHeight = 0;

  //Loading da imagem
  loading = true;
  isLoaded = false;

  //Tempo de carregamento da imagem em milissegundos: 0 = desativado, 2000 = 2 segundos
  time = 2500;

  //Referência para a imagem a ser ampliada
  @ViewChild("magnifiedImg", { static: false }) magnifiedImg!: ElementRef;

  //URL da imagem a ser ampliada
  @Input() imgSrc: string = "";

  //Emite um evento o mouse passar por cima de um separador
  @Output() mouseOverSeparator = new EventEmitter<number>();

  // Injeção do ElementRef para acessar o DOM diretamente
  constructor(private el: ElementRef) {}

  /**
   * Inicializa a lupa criando o elemento de zoom na DOM
   * Executado após a inicialização do componente
   */
  ngOnInit() {
    this.initMagnifier();
  }

  /**
   * Método chamado após a visualização do componente ser renderizada
   * Configura a funcionalidade de zoom na imagem
   */
  ngAfterViewInit() {}

  ngOnChanges(change: any) {
    // Atualizar URL da imagem
    if (change.imgSrc) {
      this.imgSrc = change.imgSrc.currentValue;
      this.loading = true;
    }
    // Atualizar tamanho da lupa
    if (change.lupaSize) {
      this.lupaSize = change.lupaSize.currentValue;
      this.ngAfterViewInit();
    }
  }

  /**
   * Cria dinamicamente o elemento da lupa (div) e adiciona ao container da imagem
   */
  initMagnifier() {
    // Criação do elemento lupa
    const magnifyDiv = document.createElement("div");
    magnifyDiv.className = "magnify";

    // Anexa o elemento ao container da imagem
    this.el.nativeElement
      .querySelector(".lupa-container")
      .appendChild(magnifyDiv);
  }

  /**
   * Configura a funcionalidade de zoom em uma imagem
   *
   * @param imgElement O elemento HTML da imagem que será ampliada
   * @param lupaDesfoque O fator de zoom da lupa
   * @param lupaSize O tamanho da lupa (diâmetro) em pixels
   */
  magnifyImg(
    imgElement: HTMLImageElement,
    lupaDesfoque: number,
    lupaSize: number,
  ) {
    // Referência à imagem e ao elemento de zoom (lupa)
    const imageElement = imgElement;
    const magnifyElement = this.el.nativeElement.querySelector(".magnify");

    // Adiciona o evento de movimentação do mouse sobre a imagem
    imageElement.addEventListener("mousemove", (event: MouseEvent) => {
      imageElement.style.cursor = "none";
      magnifyElement.style.display = "block";

      // Obtem as dimensões da imagem no viewport
      const imageRect = imageElement.getBoundingClientRect();

      // Divide a imagem em 5 quadrantes
      const quadrante = imageRect.width / 5;

      // Calcula o quadrante do mouse
      const mouseXQuadrante = event.pageX - imageRect.left - window.scrollX;

      // Emite o evento de passagem do mouse sobre o separador
      if (mouseXQuadrante > 0 && mouseXQuadrante < quadrante) {
        this.mouseOverSeparator.emit(1);
      } else if (
        mouseXQuadrante > quadrante &&
        mouseXQuadrante < quadrante * 2
      ) {
        this.mouseOverSeparator.emit(2);
      } else if (
        mouseXQuadrante > quadrante * 2 &&
        mouseXQuadrante < quadrante * 3
      ) {
        this.mouseOverSeparator.emit(3);
      } else if (
        mouseXQuadrante > quadrante * 3 &&
        mouseXQuadrante < quadrante * 4
      ) {
        this.mouseOverSeparator.emit(4);
      } else if (
        mouseXQuadrante > quadrante * 4 &&
        mouseXQuadrante < quadrante * 5
      ) {
        this.mouseOverSeparator.emit(5);
      }

      // Calcula a posição do mouse em relação à imagem
      const mouseX = event.pageX - imageRect.left - window.scrollX;
      const mouseY = event.pageY - imageRect.top - window.scrollY;

      // Define o tamanho e a imagem de fundo da lupa, com o fator de zoom
      magnifyElement.style.backgroundSize = `${imageRect.width * lupaDesfoque}px ${imageRect.height * lupaDesfoque}px`;
      magnifyElement.style.backgroundImage = `url("${imageElement.src}")`;
      magnifyElement.style.width = `${lupaSize}px`;
      magnifyElement.style.height = `${lupaSize}px`;

      // Define o tamanho da metade da lupa para calcular seu centro
      const magnifierHalfSize = lupaSize / 2;

      // Calcula a posição da lupa com base na posição do mouse na página
      const magnifierLeft =
        event.pageX - magnifierHalfSize - imageRect.left - window.scrollX;
      const magnifierTop =
        event.pageY - magnifierHalfSize - imageRect.top - window.scrollY;

      // Posiciona o elemento da lupa de acordo com o movimento do mouse
      magnifyElement.style.left = `${magnifierLeft}px`;
      magnifyElement.style.top = `${magnifierTop}px`;

      // Calcula a posição do fundo da lupa para exibir a área correta da imagem ampliada
      const bgPosX =
        -(
          (mouseX / imageRect.width) * imageRect.width * lupaDesfoque -
          magnifierHalfSize
        ) + "px";
      const bgPosY =
        -(
          (mouseY / imageRect.height) * imageRect.height * lupaDesfoque -
          magnifierHalfSize
        ) + "px";

      // Define a posição da imagem de fundo da lupa
      magnifyElement.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
    });

    // Esconde a lupa quando o mouse sai da imagem
    imageElement.addEventListener("mouseleave", () => {
      magnifyElement.style.display = "none";
    });
  }

  onLoad() {
    this.loading = false;
    if (this.magnifiedImg && this.magnifiedImg.nativeElement) {
      this.magnifyImg(
        this.magnifiedImg.nativeElement,
        this.lupaDesfoque,
        this.lupaSize,
      );
    } else {
      console.error("Elemento da imagem não encontrado");
    }
  }

  onError() {
    this.loading = false;
    this.isLoaded = false;
  }
}
