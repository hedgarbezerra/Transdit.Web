import { ConfirmAccount, InputUser, PasswordReset, PasswordUpdate } from '../../classes/Users/Users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Plan } from 'src/app/classes/Plans/Plans';
import { UserData } from 'src/app/classes/Users/UserData';
import { UserOperationResult } from 'src/app/classes/Users/UserOperationResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) {}

  getPlans() : Observable<Plan[]>{
    var results = this.httpClient.get<Plan[]>(`${environment.apiUrl}/plans`);
    return results;
  }

  createUser(user:InputUser) : Observable<UserOperationResult>{
    var result = this.httpClient.post<UserOperationResult>(`${environment.apiUrl}/users`, user);
    return result;
  }

  recoverPassword(email: string) : Observable<UserOperationResult>{
    var results = this.httpClient.get<UserOperationResult>(`${environment.apiUrl}/users/password/recovery/${email}`);
    return results;
  }

  resetPassword(resetPassword: PasswordReset): Observable<UserOperationResult> {
    var results = this.httpClient.post<UserOperationResult>(`${environment.apiUrl}/users/password/reset`, resetPassword);
    return results;
  }

  UpdatePassword(updatePassword: PasswordUpdate): Observable<UserOperationResult> {
    var results = this.httpClient.patch<UserOperationResult>(`${environment.apiUrl}/users/password/change`, updatePassword);
    return results;
  }

  ConfirmAccount(confirm: ConfirmAccount): Observable<UserOperationResult> {
    var results = this.httpClient.post<UserOperationResult>(`${environment.apiUrl}/users/confirmation`, confirm);
    return results;
  }

  AuthenticatedUserData(): Observable<UserData>{
    return this.httpClient.get<UserData>(`${environment.apiUrl}/users/component`);
  }
}
