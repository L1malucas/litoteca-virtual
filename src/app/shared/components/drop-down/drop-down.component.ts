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
    { name: "RIACHO SECO" },
    { name: "CA DE LOURDES" },
    { name: "FAZENDA COQUEIROS" },
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectProject(project: any) {
    this.selectedProject = project;
    this.isOpen = true;
  }
}
