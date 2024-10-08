import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { Variables } from "@constants/variables";
import moment from "moment";
import { Token } from "@models/system/token.model";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private localStorage: LocalStorageService) {}

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public setToken(value: string): void {
    const token = value;
    this.localStorage.store(Variables.STORAGE_AUTH, token);
  }

  public getToken(): Token {
    return this.localStorage.retrieve(Variables.STORAGE_AUTH);
  }

  public removeToken(): void {
    this.localStorage.clear(Variables.STORAGE_AUTH);
  }

  public isTokenExpired(): any {
    const token: Token = this.localStorage.retrieve(Variables.STORAGE_AUTH);
    if (token) {
      return moment(new Date()).isAfter(token.date_token_expire);
    }
  }
}
