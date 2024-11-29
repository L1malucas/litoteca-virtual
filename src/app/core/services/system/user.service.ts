import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "./base-resource.service";
import { HelpConfig } from "@config/help-config";

import { UserModel } from "@models/user.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService extends BaseResourceService<UserModel> {
  constructor(
    protected override injector: Injector,
    protected helpConfig: HelpConfig,
  ) {
    super(`${helpConfig.USUARIO_ENDPOINT}`, injector);
  }

  override create(resource: UserModel): Observable<UserModel> {
    return this._httpClient.post<UserModel>(
      `${this.helpConfig.USUARIO_ENDPOINT}Criar`,
      resource,
    );
  }

  forgotPassword(email: any): Observable<any> {
    return this._httpClient.post(
      `${this.helpConfig.USUARIO_ENDPOINT}RecuperarSenha?email=${email}`,
      {},
    );
  }

  getUserByEmail(email: any): Observable<UserModel> {
    return this._httpClient.get<UserModel>(
      `${this.helpConfig.USUARIO_ENDPOINT}Buscar?Email=${email}`,
    );
  }
}
