import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly DEFAULT_TIMEOUT = 300000; // 5 minutes

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(this.DEFAULT_TIMEOUT),
      catchError((error) => {
        return throwError(() => {
          return new Error(`Requisição muito alta: ${error.message}`);
        });
      }),
    );
  }
}
