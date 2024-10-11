import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _location: Location,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        phone: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
        occupation: ["", Validators.required],
        country: ["Brasil", Validators.required],
        state: ["BA", Validators.required],
        city: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.matchPasswords },
    );
  }

  matchPasswords(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Form Submitted!", this.registerForm.value);
    }
  }

  navigateConfirmRegister() {
    this._router.navigate(["login/confirmar-registro"]);
  }

  goBack() {
    this._location.back();
  }
}
