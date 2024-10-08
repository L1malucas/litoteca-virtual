import { Component, Input } from "@angular/core";

@Component({
  selector: "app-text-row",
  templateUrl: "./text-row.component.html",
  styleUrls: ["./text-row.component.scss"],
})
export class TextRowComponent {
  @Input() items: { text: string; text2: string; number: string }[] = [];
}
