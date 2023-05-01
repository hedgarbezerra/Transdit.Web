import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/classes/Users/Users';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { AuthenticationService } from 'src/app/services/users/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthenticationService){}
  hidePassword: boolean = true;

  get email():FormControl{
    return this.getForm('email');
  }
  get password():FormControl{
    return this.getForm('password');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    let login = this.loginForm.value as Login;
    this.authService.login(login)
  }

  getForm(name : string){ return getFormFromGroup(name, this.loginForm) }
}
