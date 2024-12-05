import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

type InputTypes = "text" | "number" | "password" | "email" | "select";

@Component({
  selector: "app-primary-input",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PrimaryInputComponent,
      multi: true,
    },
  ],
  template: `
    <div class="input-wrapper">
      <label>{{ label }}</label>
      <div class="input-content">
        <input
          [type]="type"
          [placeholder]="placeholder"
          [mask]="mask"
          [value]="value"
          (input)="onInput($event)"
          (focus)="onTouched && onTouched()"
          [disabled]="isDisabled"
          [maxLength]="maxLength"
        />
      </div>
      <span class="error-message"> {{ ErrorMessage }} * </span>
    </div>
  `,
  styleUrls: ["./primary-input.component.scss"],
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() mask: any;
  @Input() maxLength: any;
  @Input() label: string = "";
  @Input() ErrorMessage: string = "";
  protected isDisabled: boolean = false;
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

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
