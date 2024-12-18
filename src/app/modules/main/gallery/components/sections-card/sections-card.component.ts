import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sections-card",
  templateUrl: "./sections-card.component.html",
  styleUrl: "./sections-card.component.scss",
})
export class SectionsCardComponent {
  @Input() caixasSecasImages: any[] = [];
  @Input() caixasMolhadasImages: any[] = [];
  @Input() furoId!: string;

  constructor(private _router: Router) {}

  navegarParSecao(furoId: string) {
    this._router.navigate(["/secao"], {
      queryParams: { furo: furoId },
    });
  }
}
