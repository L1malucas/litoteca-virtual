import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private localStorage: LocalStorageService) {}

  public setItem(key: string, value: any): void {
    this.localStorage.store(key, value);
  }

  public getItem(key: string): any {
    return this.localStorage.retrieve(key);
  }

  public removeItem(key: string): void {
    this.localStorage.clear(key);
  }

  public clear(): void {
    this.localStorage.clear();
  }

  public hasItem(key: string): boolean {
    return !!this.getItem(key);
  }
}
