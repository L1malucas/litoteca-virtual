import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "@services/system/auth.service";
import { TokenService } from "@services/system/token.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _tokenService: TokenService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    if (_state.url !== "/") {
      if (!this._tokenService.hasToken()) {
        this.router.navigate(["/login"]);
        return false;
      }
    }
    return true;
  }
}
