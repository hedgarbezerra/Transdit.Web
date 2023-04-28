import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranscribeComponent } from './components/transcriptions/transcribe/transcribe.component';
import { LoginComponent } from './components/users/login/login.component';
import { RecoveryComponent } from './components/users/recovery/recovery.component';
import { ConfirmationComponent } from './components/users/confirmation/confirmation.component';
import { EmailChangeComponent } from './components/users/email-change/email-change.component';
import { PasswordChangeComponent } from './components/users/password-change/password-change.component';
import { PlanChangeComponent } from './components/users/plan-change/plan-change.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { MainComponent } from './components/transcriptions/main/main.component';
import { UserMainComponent } from './components/users/user-main/user-main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/transcricoes/listar'
  },
  {
    path: 'app',
    canActivate:[ ],//criar guard que irá verificar o token
    children: [
      {
        path: 'transcricoes',
        component: MainComponent,
        children:[
          {
            path: 'transcrever',
            component: TranscribeComponent
          },
          {
            path: 'listar',
            component: MainComponent
          }
        ]
      },
      {
        path: 'usuarios',
        component: UserMainComponent,
        children:[
          {
            path: 'email',
            component: EmailChangeComponent
          },
          {
            path: 'senha',
            component: PasswordChangeComponent
          },
          {
            path: 'plano',
            component: PlanChangeComponent
          }
        ]
      }
    ]
  },
  {
    path: 'cadastro',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recuperacao',
    component: RecoveryComponent
  },
  {
    path: 'confirmacao',
    component: ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
