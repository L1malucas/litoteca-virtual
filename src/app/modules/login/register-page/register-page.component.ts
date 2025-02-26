import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Toast } from "@services/system/toast.service";
import { UserService } from "@services/system/user.service";
import { Subscription } from "rxjs";
import { UserRequest } from "@models/user.model";
import { HelpConfig } from "@config/help-config";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  image!: string;
  protected form: FormGroup;
  routeId!: string;
  nameButton!: string;
  labelBack!: string;
  namePage!: string;
  toolTipImageText: string = "Adicionar foto";

  private _router = inject(Router);
  private _toast = inject(Toast);
  private _location = inject(Location);
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _helpConfig: HelpConfig,
  ) {
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      username: ["", [Validators.required, Validators.maxLength(50)]],
      telefone: ["", Validators.required],
      profissao: ["", Validators.required],
      pais: ["", Validators.required],
      estado: [""],
      cidade: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      confirmEmail: ["", [Validators.required, Validators.email]],
      foto: [null],
    });
  }

  ngOnInit(): void {
    this.verifyEditOrCreate();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this._toast.error("Erro", "Por favor, preencha os campos corretamente.");
      return;
    }

    if (this.form.value.email !== this.form.value.confirmEmail) {
      this._toast.error("Erro", "Os emails não coincidem.");
      return;
    }

    const payload: UserRequest = {
      nome: this.form.value.nome.split(" ")[0],
      sobrenome: this.form.value.nome.split(" ").slice(1).join(" "),
      telefone: this.form.value.telefone,
      profissao: this.form.value.profissao,
      pais: this.form.value.pais,
      estado: this.form.value.estado,
      cidade: this.form.value.cidade,
      foto: this.image ? this.image.split(",")[1] : null,
    };

    if (this.routeId) {
      payload.id = this.routeId;
    } else {
      payload.email = this.form.value.email;
      payload.username = this.form.value.username;
    }

    const userServiceCall = this.routeId
      ? this._userService.updateUser(this.routeId, payload)
      : this._userService.create(payload);

    this.subscription.add(
      userServiceCall.subscribe(
        () => {
          const successMessage = this.routeId
            ? "Usuário atualizado com sucesso."
            : "Usuário cadastrado com sucesso.";

          // const rote = this.routeId ? "/home" : "/confirmar-registro";
          const rote = "/home";

          this._toast.success("Sucesso", successMessage);
          this._router.navigate([rote]);
        },
        (error: any) => {
          this._toast.error(
            "Erro",
            error.error.details ? error.error.details : error.error[0],
          );
        },
      ),
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && this.isValidImage(file)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.image = e.target.result;
        this.toolTipImageText = "Alterar foto";
      };

      reader.readAsDataURL(file);
    } else {
      this._toast.error(
        "Erro",
        "Por favor, envie apenas imagens no formato JPG, JPEG ou PNG.",
      );
    }
  }

  matchEmails(group: FormGroup) {
    const email = group.get("email")?.value;
    const confirmEmail = group.get("confirmEmail")?.value;
    return email === confirmEmail ? null : { notMatching: true };
  }

  isValidImage(file: File): boolean {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    return validTypes.includes(file.type);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  goBack() {
    this._location.back();
  }

  verifyRouteId() {
    this._route.params.subscribe({
      next: (res) => {
        this.routeId = res["id"] ? res["id"] : null;
      },
      error: (err) => {
        return new Error(err);
      },
    });
  }

  verifyEditOrCreate() {
    this.verifyRouteId();
    if (this.routeId !== null) {
      this.nameButton = "ATUALIZAR CONTA";
      this.labelBack = "Voltar";
      this.namePage = "Gerenciar Conta";
      ["email", "confirmEmail", "username"].forEach((field) => {
        const control = this.form.get(field);
        if (control) {
          control.disable();
          control.clearValidators();
          control.updateValueAndValidity();
        }
      });
      this._userService.getById(this.routeId).subscribe({
        next: (user) => {
          this.form.patchValue({
            nome: `${user.data[0].nome} ${user.data[0].sobrenome}`.trim(),
            username: user.data[0].username,
            telefone: user.data[0].telefone,
            profissao: user.data[0].profissao,
            pais: user.data[0].pais,
            estado: user.data[0].estado,
            cidade: user.data[0].cidade,
            email: user.data[0].email,
            confirmEmail: user.data[0].email,
          });
          setTimeout(() => {
            if (user.data[0].fotoReferenceFtp != "") {
              this.image = `${this._helpConfig.FTP_URL}${user.data[0].fotoReferenceFtp.replace(/\\/g, "/")}`;
              this.toolTipImageText = "Alterar foto";
            } else {
              this.image = "./assets/img/image_placeholder.jpg";
              this.toolTipImageText = "Adicionar foto";
            }
          }, 1);
        },
        error: (err) => {
          return new Error(err);
        },
      });
    } else {
      this.nameButton = "CRIAR CONTA";
      this.labelBack = "Voltar";
      this.namePage = "Cadastrar Usuário";
    }
  }
}
