import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { ErroHandlerMessage, SuccessMessage } from "./../../shared/models/erro-handler-message";

@Injectable({
  providedIn: "root",
})
export class ErroHandlerService {
  private subject = new Subject<any>();
  constructor() {}

  addError(error: ErroHandlerMessage) {
    this.subject.next(error);
  }

  addsuccess(message: SuccessMessage){
    this.subject.next(message);
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}
