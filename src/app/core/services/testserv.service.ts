import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ConfirmationMessage } from './../../shared/models/confirmation-message';

@Injectable({
  providedIn: 'root'
})
export class TestservService {

 private apiUrl = 'https://localhost:8ggggg080/api/usersd';

 constructor(private http: HttpClient) { }

 getUsers(): Observable<ConfirmationMessage[]> {
   return this.http.get<ConfirmationMessage[]>(this.apiUrl);
 }

}
