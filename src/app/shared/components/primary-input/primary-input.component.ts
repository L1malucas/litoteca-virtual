import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

type InputTypes = "text" | "number" | "password" | "email";

@Component({
  selector: "app-primary-input",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PrimaryInputComponent,
      multi: true,
    },
  ],
  templateUrl: "./primary-input.component.html",
  styleUrl: "./primary-input.component.scss",
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {}
}
