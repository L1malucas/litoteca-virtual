import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Toast } from "@services/system/toast.service";
import { UserService } from "@services/system/user.service";
import { Subscription } from "rxjs";
import { UserRequest } from "@models/user.model";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  image: string = "";
  protected form: FormGroup;

  private _router = inject(Router);
  private _toast = inject(Toast);
  private _location = inject(Location);
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
  ) {
    this.form = this.formBuilder.group(
      {
        nome: ["", Validators.required],
        sobrenome: ["", Validators.required],
        username: ["", Validators.required],
        telefone: ["", Validators.required],
        profissao: ["", Validators.required],
        pais: ["", Validators.required],
        estado: ["", Validators.required],
        cidade: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required, Validators.email]],
      },
      { validator: this.matchEmails },
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.form.valid) {
      console.log(this.form.value);
      this._toast.error("Erro", "Por favor, preencha os campos corretamente.");
    } else {
      const payload: UserRequest = new UserRequest();

      payload.nome = this.form.value.nome;
      payload.sobrenome = this.form.value.sobrenome;
      payload.username = this.form.value.username;
      payload.fotoReferenceFtp = this.image;
      payload.telefone = this.form.value.telefone;
      payload.profissao = this.form.value.profissao;
      payload.pais = this.form.value.pais;
      payload.estado = this.form.value.estado;
      payload.cidade = this.form.value.cidade;
      payload.email = this.form.value.email;

      this.subscription.add(
        this._userService.create(payload).subscribe(
          () => {
            this._toast.success("Sucesso", "Usuário cadastrado.");
            this._router.navigate(["/confirmar-registro"]);
          },
          (error: any) => {
            console.error("Erro ao criar usuário:", error);
            this._toast.error(
              "Erro",
              "Ocorreu um problema ao cadastrar o usuário.",
            );
          },
        ),
      );
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && this.isValidImage(file)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.image = e.target.result; // Exibe a imagem no preview
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
}
