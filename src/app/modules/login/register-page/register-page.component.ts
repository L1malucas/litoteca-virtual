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
  imageSrc: string = "";
  protected form: FormGroup;

  private _router = inject(Router);
  private _toast = inject(Toast);
  private _location = inject(Location);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        phone: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
        occupation: ["", Validators.required],
        country: ["", Validators.required],
        state: ["", Validators.required],
        city: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
      },
      { validator: this.matchPasswords },
    );
  }

  ngOnInit(): void {}

  matchPasswords(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.navigateConfirmRegister();
    } else {
      this._toast.error("Erro", "Preencha todos os campos corretamente.");
    }
  }

  navigateConfirmRegister() {
    this._router.navigate(["/confirmar-registro"]);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && this.isValidImage(file)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      this._toast.error(
        "Erro",
        "Por favor, envie apenas imagens no formato JPG, JPEG ou PNG.",
      );
    }
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
