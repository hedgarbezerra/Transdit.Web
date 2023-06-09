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
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { DictionaryMainComponent } from './components/custom-dictionary/dictionary-main/dictionary-main.component';

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
    children: [
      {
        path: '',
        component: MainComponent,
        data:{animation: 'mainPage'}
      },
      {
        path: 'transcricoes',
        children:[
          {
            path: '',
            component: MainComponent,
            data:{animation: 'transcriptionsPage'}
          },
          {
            path: 'transcrever',
            component: TranscribeComponent,
            data:{animation: 'transcribePage'}
          }
        ]
      },
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            component: UserMainComponent,
            data:{animation: 'usersMainPage'}
          },
          {
            path: 'email',
            component: EmailChangeComponent,
            data:{animation: 'usersEmailPage'},
            outlet: 'users',
          },
          {
            path: 'senha',
            component: PasswordChangeComponent,
            data:{animation: 'usersPasswordPage'},
          },
          {
            path: 'plano',
            component: PlanChangeComponent,
            data:{animation: 'usersPlanPage'},
          }
        ]
      },
      {
        path: 'dicionarios',
        component: DictionaryMainComponent,
        data:{animation: 'dictionariesMainPage'}
      }
    ],
  },
  {
    path: 'cadastro',
    component: SignupComponent,
    data:{animation: 'signupPage'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data:{animation: 'loginPage'},    
  },
  {
    path: 'senha-perdida',
    component: RecoveryComponent,
    data:{animation: 'lostPasswordPage'},    
  },
  {
    path: 'recuperacao',
    component: PasswordChangeComponent,
    data:{animation: 'recoveryPage'},    
  },
  {
    path: 'confirmacao',
    component: ConfirmationComponent,
    data:{animation: 'accountConfirmationPage'}
  },
  {
    path: 'termos-uso',
    component: UsetermsComponent,
    data:{animation: 'usetermsPage'},
    
  },
  {
    path: 'informacoes-uso',
    component: UseinformationsComponent,
    data:{animation: 'useInformationPage'},
    
  },
  {
    path: '**',
    component: NotFoundComponent,
    data:{animation: 'notfoundPage'},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
