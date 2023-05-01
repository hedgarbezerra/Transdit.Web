import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationResult, Token } from 'src/app/classes/Users/AuthenticationResult';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/classes/Users/Users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationService {

  constructor(private httpClient:HttpClient, private snackBar: MatSnackBar, private router: Router,) {}

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

  authenticate(login: Login) : Observable<AuthenticationResult>{
    return this.httpClient.post<AuthenticationResult>(`${environment.apiUrl}/authentication`, login) ;
  }

  login(login: Login){
    this.authenticate(login)
    .pipe(catchError(err => {
      if(err.status == 400){
        let errAsResult = err.error as AuthenticationResult;
        let actualError = errAsResult.messages.join(' \n');
        this.snackBar.open(actualError, 'Fechar', { duration: 10000});
      }
      else if(err.status == 500)
        this.snackBar.open(err.error, 'Fechar', { duration: 7000});

      return EMPTY;
    }))
    .subscribe((authResult)=>{
      if(authResult.successful){
        this.snackBar.open('Conectado com sucesso, você será redirecionado(a).', 'Fechar', { duration: 2500});
        setTimeout(() => this.router.navigate(['/app']), 3000);

        let content = JSON.stringify(authResult.data);
        localStorage.setItem('jwt-token', content);
      }
      else
        this.snackBar.open(authResult.messages.join(' \n'), 'Fechar', { duration: 7000});
    })
  }

  async logout(){
    this.snackBar.open('Você está sendo desconectado...', 'Fechar', { duration: 2000, verticalPosition: 'top'});
    setTimeout(() => this.router.navigate(['/login']), 2000);

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
