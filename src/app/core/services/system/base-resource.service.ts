import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, Inject } from "@angular/core";
import { BaseResourceModel } from "@models/system/base-resource.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BaseResourceService<T extends BaseResourceModel> {
  protected _httpClient: HttpClient;

  constructor(
    @Inject(String) protected _url: string,
    protected injector: Injector,
  ) {
    this._httpClient = injector.get(HttpClient);
  }

  getById(id: string | number): Observable<T> {
    return this._httpClient.get<T>(`${this._url}/${id}`);
  }

  getAll(params?: { [param: string]: any }): Observable<T[]> {
    return this._httpClient.get<T[]>(`${this._url}`, { params });
  }

  pageCount(params?: { [param: string]: any }): Observable<any> {
    const END_POINT = "/pagecount";
    return this._httpClient.get<T[]>(`${this._url}${END_POINT}`, { params });
  }

  create(resource: T): Observable<T> {
    return this._httpClient.post<T>(this._url, resource);
  }

  update(resource: T): Observable<T> {
    return this._httpClient.put<T>(this._url, resource);
  }

  delete(id: number): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }

  lock(id: number, justification: string): Observable<T> {
    return this._httpClient.post<T>(
      `${this._url}/bloquear?id=${id}&justificativa=${justification}`,
      null,
    );
  }

  unlock(id: number, justification: string): Observable<T> {
    return this._httpClient.post<T>(
      `${this._url}/desbloquear?id=${id}&justificativa=${justification}`,
      null,
    );
  }
}
