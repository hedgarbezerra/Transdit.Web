import { InputUser } from '../../classes/Users/Users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Plan } from 'src/app/classes/Plans/Plans';
import { UserOperationResult } from 'src/app/classes/Users/UserOperationResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private httpClient:HttpClient) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-version': environment.apiVersion,
      })
    }
  }

  getPlans() : Observable<Plan[]>{
    var results = this.httpClient.get<Plan[]>(`${environment.apiUrl}/plans`);
    return results;
  }

  createUser(user:InputUser) : Observable<UserOperationResult>{
    var result = this.httpClient.post<UserOperationResult>(`${environment.apiUrl}/users`, user);
    return result;
  }
}
