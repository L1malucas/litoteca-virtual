import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DropdownComponent } from "@components/drop-down/drop-down.component";

@Component({
  selector: "app-consulta-regiao",
  templateUrl: "./consulta-regiao.component.html",
  styleUrls: ["./consulta-regiao.component.scss"],
})
export class ConsultaRegiaoComponent {
  @ViewChild(DropdownComponent) dropDown!: DropdownComponent;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["region"]) {
        this.onItemSelected(params["region"]);
        setTimeout(() => {
          this.updateDropDown(params["region"]);
        });
      }
    });
  }

  options = [
    "EXTREMO OESTE BAIANO",
    "VALE SÃO FRANCISCO DA BAHIA",
    "NORDESTE BAIANO",
    "CENTRO NORTE BAIANO",
    "CENTRO SUL BAIANO",
    "METROPOLITANA DE SALVADOR",
    "SUL BAIANO",
  ];

  selectedRegion: string = "";
  backgroundUrl: string = "../../../../assets/images/png/MapaBahia.png";

  backToHome() {
    this._router.navigate(["/home"]);
  }

  goConsultaFiltro() {
    this._router.navigate(["/consultar-regiao-filtro"]);
  }

  updateDropDown(region: string) {
    if (this.dropDown) {
      this.dropDown.selectItem(region, false);
    }
  }

  onItemSelected(region: string) {
    this.selectedRegion = region;

    switch (region) {
      case "EXTREMO OESTE BAIANO":
        this.backgroundUrl = "../../../../assets/images/png/PurpleRegion.png";
        break;
      case "VALE SÃO FRANCISCO DA BAHIA":
        this.backgroundUrl = "../../../../assets/images/png/BlueRegion.png";
        break;
      case "NORDESTE BAIANO":
        this.backgroundUrl = "../../../../assets/images/png/DarkBlueRegion.png";
        break;
      case "CENTRO NORTE BAIANO":
        this.backgroundUrl = "../../../../assets/images/png/YellowRegion.png";
        break;
      case "CENTRO SUL BAIANO":
        this.backgroundUrl = "../../../../assets/images/png/OrangeRegion.png";
        break;
      case "METROPOLITANA DE SALVADOR":
        this.backgroundUrl = "../../../../assets/images/png/GreenRegion.png";
        break;
      case "SUL BAIANO":
        this.backgroundUrl = "../../../../assets/images/png/LimeRegion.png";
        break;
      default:
        this.backgroundUrl = "../../../../assets/images/png/MapaBahia.png";
    }
  }
}
