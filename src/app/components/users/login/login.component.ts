import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginTarget } from 'src/app/classes/Users/SocialAuthentication';
import { Login } from 'src/app/classes/Users/Users';
import {  getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { AuthenticationService } from 'src/app/services/users/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthenticationService,  private snackBar: MatSnackBar){}
  hidePassword: boolean = true;

  get email():FormControl{
    return this.getForm('email');
  }
  get password():FormControl{
    return this.getForm('password');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    let login = this.loginForm.value as Login;
    this.authService.login(login)
      .subscribe((authResult)=>{
        if(authResult.successful){
          this.snackBar.open('Conectado com sucesso, você será redirecionado(a).', 'Fechar', { duration: 2500});
          this.router.navigate(['/app']);

          let content = JSON.stringify(authResult.data);
          localStorage.setItem('jwt-token', content);
        }
        else
          this.snackBar.open(authResult.messages.join(' \n'), 'Fechar', { duration: 5000});
      })
  }

  microsoftLogin(){
    this.authService.authenticateSocial(LoginTarget.Microsoft);
  }
  
  getForm(name : string){ return getFormFromGroup(name, this.loginForm) }
}
