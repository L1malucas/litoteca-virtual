import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "@components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-confirm-register",
  templateUrl: "./confirm-register.component.html",
  styleUrl: "./confirm-register.component.scss",
})
export class ConfirmRegisterComponent {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
  ) {}

  dialogOpen() {
    this._dialog.open(ConfirmDialogComponent, {});
  }
  goHome() {
    this._router.navigate(["/home"]);
  }
}
