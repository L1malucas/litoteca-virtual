import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  // matchPasswords(group: FormGroup) {
  //   const password = group.get("password")?.value;
  //   const confirmPassword = group.get("confirmPassword")?.value;
  //   return password === confirmPassword ? null : { notMatching: true };
  // }

  onSubmit() {}

  navigateConfirmRegister() {
    this._router.navigate(["login/confirmar-registro"]);
  }
}
