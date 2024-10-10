import { Component, Input } from "@angular/core";

@Component({
  selector: "app-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrl: "./drop-down.component.scss",
})
export class DropdownComponent {
  isOpen = false;
  selectedProject: any = null;
  @Input() textHeader: string = "Selecione um Item";
  @Input() options: any[] = [];
  @Input() styleDropDown: { [klass: string]: any } = {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectProject(option: any) {
    this.selectedProject = option;
    this.isOpen = true;
  }
}
