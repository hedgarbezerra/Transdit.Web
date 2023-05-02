import { catchError, retry } from 'rxjs/operators';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Plan } from 'src/app/classes/Plans/Plans';
import { MatDialog } from '@angular/material/dialog';
import { UsetermsComponent } from '../../main/useterms/useterms.component';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MinuminAgeValidator, SameAs } from 'src/app/helpers/custom-validators/password-validator';
import { HandleRequestError, getFormFromGroup } from 'src/app/helpers/HelperFunctions';
import { UsersService } from 'src/app/services/users/users.service';
import { InputUser } from 'src/app/classes/Users/Users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { UserOperationResult } from 'src/app/classes/Users/UserOperationResult';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public dialog: MatDialog, private router: Router, private userService : UsersService, private snackBar: MatSnackBar){}

  planos!: Array<Plan>;
  selectedPlan? : Plan;
  hidePassword: boolean = true;
  hidePasswordConfirm: boolean = true;

  signUpMinDate = moment().add(-18, 'years').toDate();
  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    emailConfirm: new FormControl('', [Validators.required, Validators.email, SameAs('email')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,14}$')]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14),
       Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,14}$'), SameAs('password')]),
    planId: new FormControl(0, [Validators.required]),
    birthDate: new FormControl(this.signUpMinDate, [Validators.required, MinuminAgeValidator(18)]),
    termsAccepted: new FormControl(false, [Validators.requiredTrue])
  });

  get nameForm(){ return this.getForm('name');}
  get usernameForm(){ return this.getForm('username');}
  get emailForm(){ return this.getForm('email');}
  get emailConfirmForm(){ return this.getForm('emailConfirm');}
  get passwordForm(){ return this.getForm('password');}
  get passwordConfirmForm(){ return this.getForm('passwordConfirm');}
  get planForm(){ return this.getForm('planId');}
  get birthDateForm(){ return this.getForm('birthDate');}
  get termsAcceptedForm(){ return this.getForm('termsAccepted');}

  ngOnInit(): void {

    var plansObservable = this.userService.getPlans()
      .pipe(catchError(err =>{
        let errorWithCode = HandleRequestError(err);
        this.snackBar.open(errorWithCode[1], 'Fechar', { duration: 5000});

        return EMPTY;
      }), retry({ count: 3, delay: 500 }))
      .subscribe((plans) => this.planos = plans)
  }

  CreateNewUser(){
    let user = this.newUserForm.value as InputUser;
    this.userService.createUser(user)
      .pipe(catchError(err => {
        let errorWithCode = HandleRequestError(err);
        this.snackBar.open(errorWithCode[1], 'Fechar', { duration: 5000});

        return EMPTY;
        }))
      ?.subscribe((operationResult: UserOperationResult) =>{
        if(operationResult.successful){
          this.newUserForm.reset();
          this.snackBar.open('Usuário criado com sucesso. Você será redirecionado(a) em breve', 'Fechar', { duration: 5000 });
          setTimeout(() => { this.router.navigate(['/login']) }, 5000);
        }
        else
          this.snackBar.open(operationResult.messages.join(' \n'), 'Fechar', { duration: 5000, })
      })
  }

  planChanged(){
    let planId = this.planForm.value;
    let foundPlan = this.planos?.find(p => p.id == planId);
    this.selectedPlan = foundPlan;
  }

  showUseTerms(){
    const dialogRef = this.dialog.open(UsetermsComponent, { enterAnimationDuration: '200'});
  }

  getForm(name : string){ return getFormFromGroup(name, this.newUserForm) }
}
