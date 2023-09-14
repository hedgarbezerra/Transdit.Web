import { EMPTY, Observable, Subject, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationResult, Token } from 'src/app/classes/Users/AuthenticationResult';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/classes/Users/Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthenticationService } from './social-authentication.service';
import { LoginTarget } from 'src/app/classes/Users/SocialAuthentication';
import { UserData } from 'src/app/classes/Users/UserData';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationService {

  constructor(private httpClient:HttpClient, private snackBar: MatSnackBar, private router: Router, private socialAuth: SocialAuthenticationService) {

  }

  get token() : string{
    if(this.jwtToken == null)
      return '';
    return this.jwtToken.token;
  }

  get jwtToken() : Token | null{
    let tokenString = localStorage.getItem('jwt-token');
    if(tokenString == null)
      return null;

    let tokenJson = JSON.parse(tokenString) as Token;
    return tokenJson;
  }
  
  get userInfo() : UserData | null{
    let infoString = localStorage.getItem('user-info');
    if(infoString == null)
      return null;

    let data = JSON.parse(infoString) as UserData;
    return data;
  }
  authenticate(login: Login) : Observable<AuthenticationResult>{
    return this.httpClient.post<AuthenticationResult>(`${environment.apiUrl}/authentication`, login) ;
  }

  login(login: Login) : Observable<AuthenticationResult>{
    return this.authenticate(login);
  }
  
  async logout(){
    this.snackBar.open('Você está sendo desconectado...', 'Fechar', { duration: 1000, verticalPosition: 'top'});
    setTimeout(() => this.router.navigate(['/login']), 500);

    localStorage.clear();
  }


  checkAuthenticated(): boolean {
    if(this.jwtToken == null)
      return false;
    return new Date() <= new Date(this.jwtToken.expiracy);
  }

  checkAuthenticatedObs(): Observable<boolean>{
    return of(this.checkAuthenticated())
      .pipe(tap((val) => !val ? this.router.navigate(['/login']): val))
  }
}

const canActivateAuthenticated: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthenticationService).checkAuthenticatedObs();
  };

const canActivateAuthenticatedChild: CanActivateChildFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthenticationService).checkAuthenticatedObs();
};

export const guards = {
  canActivateAuthenticated,
  canActivateAuthenticatedChild,
}
