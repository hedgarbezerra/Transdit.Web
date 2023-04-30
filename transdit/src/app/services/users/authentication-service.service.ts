import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationServiceService {

  constructor(private httpClient:HttpClient) {}

  canActivate(token: string): boolean {
    return true;
  }
}
