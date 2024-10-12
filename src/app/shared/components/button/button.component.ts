import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() type: string = "button";
  @Input() disabled: boolean = false;
  @Input() onClick: any = () => {};
  @Input() buttonStyle: { [klass: string]: any } = {};
  @Input() customClass: string = "";
}
