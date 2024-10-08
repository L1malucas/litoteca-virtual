import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrl: "./error.component.scss",
})
export class ErrorComponent {
  _router = inject(Router);
  redirect() {
    this._router.navigate(["/home"]);
  }
}
