import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserOperationResult } from 'src/app/classes/Users/UserOperationResult';
import { PasswordReset, PasswordUpdate } from 'src/app/classes/Users/Users';
import { getFormFromGroup, getQueryVariable } from 'src/app/helpers/HelperFunctions';
import { RequiredIf, SameAs } from 'src/app/helpers/custom-validators/password-validator';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
  constructor(private activatedRoute : ActivatedRoute, private router: Router, private userService: UsersService, private snackBar: MatSnackBar){}

  hideOldPassword: boolean = true;
  hidePassword: boolean = true;
  hidePasswordConfirm: boolean = true;

  passwordResetForm = new FormGroup({
    oldPassword: new FormControl('', [RequiredIf(!this.IsRequestingRecovery), Validators.minLength(6), Validators.maxLength(14),
      Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,14}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14),
      Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,14}$')]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), SameAs('password')])
  });

  get token(): string | null{
    return getQueryVariable("token");
  }
  get user(): string | null{
    return getQueryVariable("user");
  }
  get IsRequestingRecovery(): boolean {
    return this.token != null  && this.user != null;
  }

  get oldPasswordForm(): FormControl{
    return getFormFromGroup('oldPassword', this.passwordResetForm);
  }
  get passwordForm(): FormControl{
    return getFormFromGroup('password', this.passwordResetForm);
  }
  get passwordConfirmForm(): FormControl{
    return getFormFromGroup('passwordConfirm', this.passwordResetForm);
  }

  onSubmit(){
    var result;
    if(this.IsRequestingRecovery){
      let currentObj =  this.passwordResetForm.value as PasswordReset;
      currentObj.token = this.token ?? '';
      currentObj.email = this.user ?? '';
      result = this.userService.resetPassword(currentObj);
    }
    else{
      let currentObj = this.passwordResetForm.value as PasswordUpdate;
       result =  this.userService.UpdatePassword(currentObj);
    }

    result.subscribe((operationResult: UserOperationResult) =>{
      if(operationResult.successful){
        this.passwordResetForm.reset();

        if(this.IsRequestingRecovery)
          setTimeout(() => { this.router.navigate(['/login']) }, 5000);
      }
      let message = operationResult.messages.join(' \n');
      this.snackBar.open(message, 'Fechar', { duration: 5000, })
    })
  }
}
