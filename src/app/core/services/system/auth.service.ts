import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HelpConfig } from "@config/help-config";
import { LogoutType } from "@enums/logout-types.enum";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "./token.service";
import { LocalStorageService } from "ngx-webstorage";
import { UserLoginModel } from "@models/system/login-response.model";
import { Variables } from "@constants/variables";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserLoginModel>({});
  private _subscription: Subscription;
  private END_POINT: string = "identity/token";
  private BASE_URL: string = "https://cbpm-dev-api.renova.app.br/";
  private CLIENT_ID: string = "CBPM-RDiamond";
  private CLIENT_SECRET: string = "Q2ne7gld9l3yTHSmJ9m9Lm0shHTIWqQ1";
  loading = false;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig,
    private toastrService: ToastrService,
    private _tokenService: TokenService,
    private storage: LocalStorageService,
    private router: Router,
  ) {
    this._subscription = new Subscription();
  }

  authenticate(user: any, successCallBack: any, errorCallBack: any) {
    const payload = new HttpParams()
      .set("username", user.username)
      .set("password", user.senha)
      .set("grant_type", "password")
      .set("client_id", "CBPM-RDiamond")
      .set("client_secret", "Q2ne7gld9l3yTHSmJ9m9Lm0shHTIWqQ1")
      .set("scope", "openid");

    this._subscription.add(
      this.login(payload).subscribe({
        next: (result: any) => {
          this._tokenService.setToken(result);
          return successCallBack(true);
        },
        error: (err) => {
          errorCallBack(err);
        },
      }),
    );
  }

  login(payload: HttpParams): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    headers.set(
      "Authorization",
      "Basic " + btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET),
    );
    return this._httpClient.post(
      this._helpConfig.BASE_API + this.END_POINT,
      payload.toString(),
      { headers },
    );
  }

  logout(type: LogoutType = LogoutType.Default) {
    switch (type) {
      case LogoutType.Inactivity:
        this.toastrService.info(
          "Você foi desconectado por inatividade! Por favor, faça o login novamente",
          "Desconectado",
        );
        break;
      case LogoutType.Unauthorized:
        this.toastrService.info(
          "Por motivos de autorização você foi desconectado do sistema. Por favor, faça o login novamente.",
          "Desconectado",
        );
        break;
      case LogoutType.Expires:
        this.toastrService.info(
          "Sua sessão expirou por inatividade. Por favor, faça o login novamente",
          "Sua sessão expirou!",
        );
        break;
      default:
        this.toastrService.info(
          "O logout foi efetuado com sucesso.",
          "Logout!",
        );
        break;
    }
    this.storage.clear(Variables.USER_AUTH);
    this._tokenService.removeToken();
    this.userSubject.next({});
    const path = "/login";
    this.router.navigate([path]);
  }
}
