import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { LoginComponent } from './components/users/login/login.component';
import { ConfirmationComponent } from './components/users/confirmation/confirmation.component';
import { RecoveryComponent } from './components/users/recovery/recovery.component';
import { PasswordChangeComponent } from './components/users/password-change/password-change.component';
import { EmailChangeComponent } from './components/users/email-change/email-change.component';
import { PlanChangeComponent } from './components/users/plan-change/plan-change.component';
import { MainComponent } from './components/transcriptions/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ConfirmationComponent,
    RecoveryComponent,
    PasswordChangeComponent,
    EmailChangeComponent,
    PlanChangeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
