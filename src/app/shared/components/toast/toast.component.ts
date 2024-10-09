import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";
import { Component } from "@angular/core";
import { Toast, ToastrService, ToastPackage } from "ngx-toastr";

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "[toast.component]",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  animations: [
    trigger("flyInOut", [
      state(
        "inactive",
        style({
          display: "none",
          opacity: 0,
        }),
      ),
      transition(
        "inactive => active",
        animate(
          "400ms ease-out",
          keyframes([
            style({
              transform: "translate3d(100%, 0, 0) skewX(-30deg)",
              opacity: 0,
            }),
            style({
              transform: "skewX(20deg)",
              opacity: 1,
            }),
            style({
              transform: "skewX(-5deg)",
              opacity: 1,
            }),
            style({
              transform: "none",
              opacity: 1,
            }),
          ]),
        ),
      ),
      transition(
        "active => removed",
        animate(
          "400ms ease-out",
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: "translate3d(100%, 0, 0) skewX(30deg)",
              opacity: 0,
            }),
          ]),
        ),
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ToastComponent extends Toast {
  public undoString = "undo";
  public toastType;

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
    this.toastType = toastPackage.toastType;
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = "undid";
    this.toastPackage.triggerAction();
    return false;
  }

  openNotification() {
    this.toastPackage.triggerAction();
    this.remove();
    return false;
  }
}
