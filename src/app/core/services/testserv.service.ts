import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
