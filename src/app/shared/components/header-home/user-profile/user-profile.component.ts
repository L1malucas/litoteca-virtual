import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/system/auth.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  animations: [
    trigger("showMenu", [
      state("expanded", style({ height: "15vh", minHeight: "15vh" })),
      state(
        "collapsed",
        style({ height: "0", minHeight: "0", display: "none" }),
      ),
      transition("expanded => collapsed", [animate("0.2s")]),
      transition("collapsed => expanded", [animate("0.2s")]),
    ]),
  ],
})
export class UserProfileComponent {
  @Input() show: boolean = false;
  user: any = {
    name: "Valbério Sá",
    email: "valberiosa@cbpm.gov.ba.br",
  };

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  editProfile() {
    this._router.navigate(["/editar-perfil"]);
  }

  logout() {
    this._authService.logout();
  }

  close(): void {
    this.show = !this.show;
  }

  closeMenu(element?: any): void {
    console.log(element);
    if (!element) {
      return;
    } else if (element.target && element.target.id == "menubutton") {
      this.close();
    } else {
      return;
    }
  }
}
