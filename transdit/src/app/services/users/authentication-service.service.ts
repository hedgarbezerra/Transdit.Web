import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationServiceService {

  canActivate(token: string): boolean {
    return true;
  }
}
