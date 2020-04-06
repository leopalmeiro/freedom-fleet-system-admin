import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {
  private erroStr : String;
  constructor() { }

  addError(erro : String ){
    this.erroStr = erro;
  };

  getErrors(): Observable<any>{
     const erroObservable = new Observable(observer => observer.next(this.erroStr));
     return erroObservable;
  };
}
