import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { ErroHandlerService } from "./../services/erro-handler.service";
import { ErroHandlerMessage } from "./../../shared/models/erro-handler-message";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  erroHandlerMessage: ErroHandlerMessage;
  constructor(private erroHandlerService: ErroHandlerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.erroHandlerMessage = {
            codeError: null,
            error: error.error.message,
          };
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          console.log(errorMessage);
          this.erroHandlerMessage = {
            codeError: error.status,
            error: error.message,
          };
        }
        this.erroHandlerService.addError(this.erroHandlerMessage);
        return throwError(errorMessage);
      })
    );
  }
}
