import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HelperResponseError } from 'src/app/shared/models/HelperResponseError';
import { ResponseError } from "src/app/shared/models/ResponseError";

@Injectable({
  providedIn: "root",
})
export class ErroHandlerService {
  private subject = new Subject<any>();
  private responseEerror: ResponseError = new HelperResponseError();
  constructor() {}

  addError(error: ResponseError) {
    this.responseEerror = error
    this.responseEerror.hasError = true;
    this.subject.next(this.responseEerror);
  }
  addsuccess(message: String) {
    this.responseEerror.hasError= false;
    this.responseEerror.message = message;
    this.subject.next(this.responseEerror);
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}
