import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "@services/system/token.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  constructor(
    private _router: Router,
    private tokenService: TokenService,
  ) {}

  navigateTo(route: string) {
    this._router.navigate([route]);
  }

  logout() {
    this.tokenService.removeToken();
    this._router.navigate(["login"]);
  }
}
