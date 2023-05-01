import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/users/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(private authService: AuthenticationService){}

  get isAuthenticated() : boolean{
    return this.authService.checkAuthenticated();
  }

  logout(){
    this.authService.logout();
  }
}
