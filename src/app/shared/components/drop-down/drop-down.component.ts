import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrl: "./drop-down.component.scss",
})
export class DropdownComponent {
  isOpen = false;
  selectedProject: string | null = null;
  @Input() textHeader: string = "Selecione um Item";
  @Input() options: any[] = [];
  @Input() styleDropDown: { [klass: string]: any } = {};
  @Output() itemSelected = new EventEmitter<string>();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(option: any, emitEvent: boolean = true) {
    this.selectedProject = option.nome;
    this.isOpen = false; // Sempre fechar o dropdown após a seleção
    if (emitEvent) {
      this.itemSelected.emit(option);
    }
  }
}
