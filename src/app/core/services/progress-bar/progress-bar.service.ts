import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum mode{
  "active" = 'indeterminate',
  "desactive" = ''
}
@Injectable({
  providedIn: 'root'
})

export class ProgressBarService {
  private subject = new Subject<any>();

  constructor() {}

  active() : Observable<any>{
    this.subject.next(mode.active);
    return this.subject.asObservable();
  }

  desactive() : Observable<any>{
    this.subject.next(mode.desactive);
    return this.subject.asObservable();
  }

}
