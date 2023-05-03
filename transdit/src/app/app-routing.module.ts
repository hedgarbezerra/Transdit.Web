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
import { guards } from './services/users/authentication.service';
import { UseinformationsComponent } from './components/main/useinformations/useinformations.component';
import { UsetermsComponent } from './components/main/useterms/useterms.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    canActivate:[guards.canActivateAuthenticated],
    canActivateChild: [guards.canActivateAuthenticatedChild],
    component: MainComponent,
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
    path: 'senha-perdida',
    component: RecoveryComponent
  },
  {
    path: 'recuperacao',
    component: PasswordChangeComponent
  },
  {
    path: 'confirmacao',
    component: ConfirmationComponent
  },
  {
    path: 'termos-uso',
    component: UsetermsComponent
  },
  {
    path: 'informacoes-uso',
    component: UseinformationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
