import { catchError, EMPTY, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/users/authentication.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.token;

    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
        'x-api-version': environment.apiVersion,
      },
    });
    return next.handle(req);
  }
}

@Injectable()
export class UnauthenticatedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401)
          this.router.navigate(['/login']);

        return throwError(() => err);
      })
    );
  }
}
