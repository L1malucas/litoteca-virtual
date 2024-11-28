import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Toast } from "@services/system/toast.service";

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

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        surname: ["", Validators.required],
        username: ["", Validators.required],
        imageUser: ["", Validators.required],
        phone: ["", Validators.required],
        occupation: ["", Validators.required],
        country: ["", Validators.required],
        state: ["", Validators.required],
        city: ["", Validators.required],
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
      console.log(this.form.value);
      this._toast.success("Suceeso", "Usuário cadastrado.");
      // this._router.navigate(["/confirmar-registro"]);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && this.isValidImage(file)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.form.patchValue({
          imageUser: e.target.result,
        });
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
