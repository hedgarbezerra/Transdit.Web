import { Component } from '@angular/core';
import * as moment from 'moment';
import { Plan } from 'src/app/classes/Plans/Plans';
import { MatDialog } from '@angular/material/dialog';
import { UsetermsComponent } from '../../main/useterms/useterms.component';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MinuminAgeValidator } from 'src/app/helpers/custom-validators/password-validator';
import { getFormFromGroup } from 'src/app/helpers/HelperFunctions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public dialog: MatDialog){}
  signUpMinDate = moment().add(-18, 'years').toDate();
  planos : Array<Plan> = [
    {
      "id": 1,
      "name": "Grátis",
      "description": "Plano gratuíto com limite de 30 minutos de transcrição para quem deseja experimentar a ferramenta.",
      "allowTranscriptionSaving": false,
      "price": 0,
      "monthlyLimitUsageMinutes": 30
    },
    {
      "id": 2,
      "name": "Básico",
      "description": "Plano basico mensal limitado à 100 minutos de transcrição.",
      "allowTranscriptionSaving": false,
      "price": 22.99,
      "monthlyLimitUsageMinutes": 100
    },
    {
      "id": 3,
      "name": "Padrão",
      "description": "Plano padrão com capacidade de transcrição de 250 minutos mensais e salvamento do resultado das transcrições, se desejar",
      "allowTranscriptionSaving": true,
      "price": 52.99,
      "monthlyLimitUsageMinutes": 250
    },
    {
      "id": 4,
      "name": "Premium",
      "description": "Plano Premium com capacidade de transcrição de 500 minutos mensais, assim como capacidade de salvar as transcrições",
      "allowTranscriptionSaving": true,
      "price": 100,
      "monthlyLimitUsageMinutes": 500
    },
    {
      "id": 5,
      "name": "Pago por Uso",
      "description": "Plano pago por uso mensal com todas capacidades do plano Premium porém sem limite de tempo, mas cada minuto sendo cobrado por R$0,2357736",
      "allowTranscriptionSaving": true,
      "price": 0,
      "monthlyLimitUsageMinutes": 15372286728.091293
    }
  ];
  selectedPlan! : Plan;
  hidePassword: boolean = true;
  hidePasswordConfirm: boolean = true;

  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    emailConfirm: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,14}$')]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,14}$')]),
    planId: new FormControl(0, [Validators.required]),
    birthDate: new FormControl(null, [Validators.required, MinuminAgeValidator(18)]),
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


  CreateNewUser(){

  }

  planChanged(){
    let planId = this.planForm.value;
    let foundPlan = this.planos.find(p => p.id == planId);
    if(foundPlan)
      this.selectedPlan = foundPlan;
  }

  showUseTerms(){
    const dialogRef = this.dialog.open(UsetermsComponent, { enterAnimationDuration: '200'});
  }

  getForm(name : string){ return getFormFromGroup(name, this.newUserForm) }
}
