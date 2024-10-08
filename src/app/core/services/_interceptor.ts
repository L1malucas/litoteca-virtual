import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "./system/token.service";
import { LogoutType } from "@enums/logout-types.enum";
import { AuthService } from "./system/auth.service";
import { MESSAGES } from "@constants/messages.constants";
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _toastrService: ToastrService,
    private authService: AuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this._tokenService.getToken()) {
      const token = this._tokenService.getToken().access_token;

      let newReq = null;

      if (req.params.get("noToken")) {
        newReq = req.clone();
      } else {
        newReq = req.clone({
          headers: req.headers
            .append("Authorization", "Bearer " + token)
            .append("Content-Type", "application/x-www-form-urlencoded"),
        });
      }

      return next.handle(newReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // LOCAL PARA VERIFICAR ALGUMA LOGICA NA RESPOSTA
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.authService.logout(LogoutType.Unauthorized);
              } else {
                if (err && err.status == 400) {
                  if (err && err.error && err.error.message) {
                    this._toastrService.warning(err.error.message, "Alerta");
                  } else {
                    this._toastrService.warning(MESSAGES.no_proccess, "Alerta");
                  }
                } else if (err && err.status == 404) {
                  if (err && err.error && err.error.message) {
                    this._toastrService.info(err.error.message, "Alerta");
                  } else {
                    this._toastrService.info(MESSAGES.no_data, "Alerta");
                  }
                } else if (err && err.status == 500) {
                  if (err && err.error && err.error.message) {
                    this._toastrService.error(err.error.message, "Erro");
                  } else {
                    this._toastrService.error(MESSAGES.no_proccess, "Erro");
                  }
                } else {
                  this._toastrService.error(MESSAGES.no_proccess, "Erro");
                }
              }
            }
          },
        ),
      );
    }
    // NÃO ESTÁ LOGADO. CONTINUA SEM ADICIONAR HEADER.
    return next.handle(req);
  }
}
