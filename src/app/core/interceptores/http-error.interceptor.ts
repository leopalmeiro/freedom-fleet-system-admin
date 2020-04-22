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
import { retry, catchError, delay, tap } from "rxjs/operators";
import { ErroHandlerService } from "./../services/erro-handler.service";
import { ErroHandlerMessage } from "./../../shared/models/erro-handler-message";
import { ProgressBarService } from '../services/progress-bar/progress-bar.service';
import { HelperResponseError } from 'src/app/shared/models/HelperResponseError';
import { ResponseError } from 'src/app/shared/models/ResponseError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  erroHandlerMessage: ResponseError = new HelperResponseError();

  /**
   * Constructor Method
   * @param erroHandlerService
   * @param progressBarService
   */
  constructor(private erroHandlerService: ErroHandlerService, private progressBarService: ProgressBarService) {}
  /**
   * Intercept Method
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        //if for check if is graphql, if true graphQl has another interceptor for check all errors
        if(error.url !== environment.GraphQLUri){

        this.erroHandlerMessage.hasError = true;
        this.erroHandlerMessage.status = error.status? error.status : null ;
        this.erroHandlerMessage.statusText = error.message? error.message:  null;
        this.erroHandlerMessage.message = error.error? error.error.message: null;
        this.erroHandlerService.addError(this.erroHandlerMessage);
        this.progressBarService.desactive();
        }
        return throwError(error);
      }),

    );
  }
}
