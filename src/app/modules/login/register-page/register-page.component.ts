import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  private _router = inject(Router);
  protected form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    occupation: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    confirmEmail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form);
  }

  navigateConfirmRegister() {
    this._router.navigate(["login/confirmar-registro"]);
  }
}
