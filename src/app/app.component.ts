import { Component } from "@angular/core";

interface Project {
  id: number;
  name: string;
  alvo: string;
  furo: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "litoteca-virtual";
  region: string = "EXTREMO OESTE BAIANO";
  projects: Project[] = [
    { id: 1, name: "RIACHO SECO", alvo: "-", furo: "LP22" },
    { id: 2, name: "RIACHO SECO", alvo: "-", furo: "LP22" },
    { id: 3, name: "PROJETO A", alvo: "X", furo: "LP23" },
    { id: 4, name: "PROJETO B", alvo: "Y", furo: "LP24" },
  ];
}
