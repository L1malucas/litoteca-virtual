import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-default-login-layout",
  templateUrl: "./default-login-layout.component.html",
  styleUrl: "./default-login-layout.component.scss",
})
export class DefaultLoginLayoutComponent {
  @Input({ required: true }) title: string = "Consulta de Fotograma";
  @Input({ required: true }) primaryBtnText: string = "";
  @Input({ required: true }) secondaryBtnText: string = "";
  @Input({ required: true }) disablePrimaryBtn: boolean = true;

  @Output("submit") onSubmit = new EventEmitter<void>();
  @Output("navigate") onNavigate = new EventEmitter<void>();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
