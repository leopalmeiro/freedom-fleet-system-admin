import { Injectable } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErroHandlerService } from './../services/erro-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private erroHandlerService: ErroHandlerService){}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Error: ${error.error.message}`;
           console.log(errorMessage);
          this.erroHandlerService.addError(errorMessage);


         } else {
           // server-side error
           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
           console.log(errorMessage);
           this.erroHandlerService.addError(errorMessage);
         }
         console.log(`erro ${errorMessage}`);
           this.erroHandlerService.addError(errorMessage);

         window.alert(errorMessage);
         return throwError(errorMessage);
       })
     )
 }
}
