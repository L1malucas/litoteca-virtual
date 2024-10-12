import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header-home",
  templateUrl: "./header-home.component.html",
  styleUrl: "./header-home.component.scss",
})
export class HeaderHomeComponent {
  @Input() styleHeader: { [klass: string]: any } = {};

  user = {
    name: "Válberio Sá",
    info: "Técnico em Geologia",
  };
}
