import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast } from "@services/system/toast.service";

@Component({
  selector: "app-register",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  imageSrc: string = "";
  private _router = inject(Router);
  private _toast = inject(Toast);
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
}
