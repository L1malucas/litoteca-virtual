import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Variables } from "@constants/variables";
import { AuthService } from "@services/system/auth.service";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "ngx-webstorage";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  animations: [
    trigger("isLoading", [
      state(
        "fadeIn",
        style({
          display: "flex",
        }),
      ),
      state(
        "fadeOut",
        style({
          display: "none",
        }),
      ),
      transition("fadeIn => fadeOut", [animate("0.3s")]),
      transition("fadeOut => fadeIn", [animate("0.5s")]),
    ]),
  ],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public formForgotPassword!: FormGroup;
  loading = false;
  showPassword = false;
  isLoged = false;
  currentYear!: string;
  isForgotPassword: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _toast: ToastrService,
    private _authService: AuthService,
    private _storage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.verifyLogin();
    this._buildForm();
    this._buildFormForgotPassword();
    this.getCurrentYear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentYear(): void {
    this.currentYear = new Date().getFullYear().toString();
  }

  verifyLogin() {
    this.isLoged = !!this._storage.retrieve(Variables.STORAGE_AUTH)
      ?.access_token;
    if (this.isLoged) {
      this._router.navigate(["home"]);
    }
  }

  submit() {
    if (this.form.invalid) {
      this.showInvalidFormDialog(this.form);
      return;
    }

    const { email, senha } = this.form.getRawValue();
    this.loading = true;

    this.subscription.add(
      this._authService.authenticate(
        { username: email, senha },
        this.onLoginSuccess.bind(this),
        this.onLoginError.bind(this),
      ),
    );
  }

  submitForgotPassword() {
    if (this.formForgotPassword.invalid) {
      this.showInvalidFormDialog(this.formForgotPassword);
      return;
    }

    const { email } = this.formForgotPassword.getRawValue();
    this.loading = true;

    console.log(email);
  }

  private showInvalidFormDialog(form: FormGroup) {
    const invalidFields = Object.keys(form.controls)
      .filter((field) => {return form.get(field)?.invalid})
      .map((field) => {return `O campo ${field} é inválido.`})
      .join("\n");

    if (invalidFields) {
      this._toast.error(invalidFields);
    }
  }

  private onLoginSuccess() {
    this._toast.success("Login efetuado com sucesso!");
    this.loading = false;
    this._router.navigate(["home"]);
  }

  private onLoginError(err: any) {
    this.loading = false;

    if (err.status === 401) {
      this._toast.error("Usuário ou senha inválidos!");
    } else if (err.status === 400) {
      this._toast.error("Erro ao efetuar login!");
    }
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required]),
      senha: new FormControl("", [Validators.required]),
    });
  }

  private _buildFormForgotPassword(): void {
    this.formForgotPassword = new FormGroup({
      email: new FormControl("", [Validators.required]),
    });
  }

  viewPassword() {
    this.showPassword = !this.showPassword;
    const inputPass = document.getElementById("password") as HTMLInputElement;
    const btnShowPass = document.getElementById("btn-password");

    if (inputPass) {
      inputPass.type = this.showPassword ? "text" : "password";
      const iconPath = this.showPassword
        ? "../../../assets/images/svg/eye-fill.svg"
        : "../../../assets/images/svg/eye-slash-fill.svg";
      btnShowPass?.setAttribute("src", iconPath);
    }
  }

  registerPage() {
    this._router.navigate(["/cadastro"]);
  }

  forgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
  }
}
