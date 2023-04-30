import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword: boolean = true;
  
  get email() :FormControl{
    return this.getForm('email');
  }
  get password() :FormControl{
    return this.getForm('password');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.warn(this.loginForm.value);
  }

  getForm(name : string){ return getFormFromGroup(name, this.loginForm) }
}
