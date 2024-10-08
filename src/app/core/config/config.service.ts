import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  config: any;

  constructor(private injector: Injector) {}

  load(url: string) {
    const injectHttp = this.injector.get(HttpClient);
    return new Promise((resolve) => {
      injectHttp
        .get(url)
        .pipe(
          map((res) => {
            return res;
          }),
        )
        .subscribe((config) => {
          this.config = config;
          resolve({});
        });
    });
  }

  getUrl(element: string, dataList?: string) {
    if (this.config) {
      if (!dataList) {
        const urlWithElement = this.config[element];
        return this.verifyUrl(urlWithElement);
      } else {
        const urlWithElement = this.config[dataList][element];
        return this.verifyUrl(urlWithElement);
      }
    } else {
      return null;
    }
  }

  verifyUrl(typeModel: any): string {
    if (typeModel) {
      if (typeModel.includes("/", typeModel.length - 1)) {
        const typeRelease = typeModel;
        return typeRelease;
      } else {
        const newTipe = `${typeModel}/`;
        return newTipe;
      }
    }
    return "/";
  }

  getEndPoint(elementUrl: string, elementPath: string) {
    if (this.config) {
      const url = this.verifyUrl(this.config["URL"][elementUrl]);
      const path = this.verifyUrl(this.config["PATHS"][elementPath]);
      return url + path;
    } else {
      return "";
    }
  }
}
