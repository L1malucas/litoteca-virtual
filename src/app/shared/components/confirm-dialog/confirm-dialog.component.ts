import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogInterface } from "@customTypes/system/ConfirmDialog.interface";

@Component({
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent implements OnInit {
  showSubtitle: boolean = true;
  confirmResult: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInterface,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.showSubtitle =
      this.data.showSubtitle !== undefined
        ? this.data.showSubtitle
        : this.showSubtitle;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
