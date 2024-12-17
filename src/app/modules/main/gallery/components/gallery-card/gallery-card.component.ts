import { Component, Input } from "@angular/core";

@Component({
  selector: "app-gallery-card",
  templateUrl: "./gallery-card.component.html",
  styleUrl: "./gallery-card.component.scss",
})
export class GalleryCardComponent {
  @Input() combineImagens?: any[] = [];
}
