import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "@components/confirm-dialog/confirm-dialog.component";
import { Variables } from "@constants/variables";
import { ConfirmDialogInterface } from "@customTypes/system/ConfirmDialog.interface";
import { AuthService } from "@services/system/auth.service";
import { LocalStorageService } from "ngx-webstorage";

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
export class LoginPageComponent implements OnInit {
  email: string = "";
  password: string = "";
  rememberMe: boolean = false;

  public form!: FormGroup;
  loading = false;
  showPassword = false;
  isLoged = false;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _storage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.verifyLogin();
    this._buildForm();
  }

  verifyLogin() {
    this.isLoged = this._storage.retrieve(Variables.STORAGE_AUTH)?.access_token;
    if (this.isLoged) {
      this._router.navigate(["home"]);
    }
  }

  submit() {
    if (this.form.invalid) {
      let invalidFieldsMessage = "";

      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (control && control.invalid) {
          invalidFieldsMessage += `O campo ${field} é inválido. \n`;
        }
      });

      this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(
        ConfirmDialogComponent,
        {
          data: {
            title: "Formulário inválido!",
            subtitle:
              invalidFieldsMessage ||
              "Por favor, preencha todos os campos corretamente.",
            onlyOkButton: true,
          },
        },
      );
      return;
    }

    const data = this.form.getRawValue();
    this.loading = true;

    this._authService.authenticate(
      data,
      () => {
        this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(
          ConfirmDialogComponent,
          {
            data: {
              title: "Login feito com sucesso!",
              subtitle: "Você será redirecionado para a página inicial.",
              onlyOkButton: true,
            },
          },
        );

        this.loading = false;
        this._router.navigate(["home"]);
      },
      (err: any) => {
        this.loading = false;

        if (err.status === 401) {
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(
            ConfirmDialogComponent,
            {
              data: {
                title: "Usuário ou senha inválidos!",
                subtitle: "Por favor, tente novamente.",
                onlyOkButton: true,
              },
            },
          );
        } else if (err.status === 400) {
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(
            ConfirmDialogComponent,
            {
              data: {
                title: "Erro ao fazer login!",
                subtitle: "Por favor, tente novamente.",
                onlyOkButton: true,
              },
            },
          );
        }
      },
    );
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      senha: new FormControl("", [
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        // ),
      ]),
    });
  }

  viewPassword() {
    const inputPass = document.getElementById("password");
    const btnShowPass = document.getElementById("btn-password");

    if (inputPass instanceof HTMLInputElement) {
      if (inputPass.type === "password") {
        inputPass.setAttribute("type", "text");
        btnShowPass?.setAttribute(
          "src",
          "../../../assets/images/svg/eye-fill.svg",
        );
      } else {
        inputPass.setAttribute("type", "password");
        btnShowPass?.setAttribute(
          "src",
          "../../../assets/images/svg/eye-slash-fill.svg",
        );
      }
    }
  }

  registerPage() {
    this._router.navigate(["/login/cadastro"]);
  }
}
