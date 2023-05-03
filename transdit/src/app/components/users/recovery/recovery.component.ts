import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserOperationResult } from 'src/app/classes/Users/UserOperationResult';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  constructor(private userService: UsersService, private snackBar: MatSnackBar,  private router: Router){}

  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email(): FormControl{
    return getFormFromGroup('email', this.recoveryForm);
  }

  onSubmit(){
    let email : string = this.email.value;

    this.userService.recoverPassword(email)
    .subscribe((operationResult: UserOperationResult) =>{
      if(operationResult.successful)
        this.recoveryForm.reset();

      let messages = operationResult.messages.join(' \n');
      this.snackBar.open(messages, 'Fechar', { duration: 5000, });
    })
  }

}
