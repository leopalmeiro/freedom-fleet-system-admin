import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {
  private _subject = new Subject<>
  constructor() { }

  erro(title: string, message: string){

  }
}
