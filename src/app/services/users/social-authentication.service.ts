import { SocialUser, SocialAuthService, GoogleLoginProvider, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginTarget } from 'src/app/classes/Users/SocialAuthentication';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  
  accessToken!: string;

constructor(private externalAuthService: SocialAuthService, private http: HttpClient) { 
  this.externalAuthService.authState.subscribe((user) => {
    this.sendInfoBackend(user);
    this.extAuthChangeSub.next(user);
  })
}

  authenticate(target: LoginTarget): void{
    switch(target){
      case LoginTarget.Google:
        this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        break;
      case LoginTarget.Microsoft:
        this.externalAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
        break;
    }
  }

  signOutExternal = () => {
    this.externalAuthService.signOut();
  }

  sendInfoBackend(user: SocialUser){
    this.http.post(`${environment.apiUrl}/authentication/sso`, user)
    .subscribe(res => console.log(res))
  }

  getAccessToken(): void {
    this.externalAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
}
