import { Component } from "@angular/core";

@Component({
  selector: "app-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrl: "./drop-down.component.scss",
})
export class DropdownComponent {
  isOpen = false;
  selectedProject: any = null;

  projects = [
    { name: "RIACHO SECO", description: "Dados sobre o alvo Riacho Seco." },
    {
      name: "CA DE LOURDES",
      description: "Informações sobre o alvo Ca de Lourdes.",
    },
    {
      name: "FAZENDA COQUEIROS",
      description: "Informações sobre o alvo Fazenda Coqueiros.",
    },
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectProject(project: any) {
    this.selectedProject = project;
    this.isOpen = true;
  }
}
