import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';


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
import { HomeComponent } from './components/main/home/home.component';
import { NavbarComponent } from './components/main/navbar/navbar.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { TranscribeComponent } from './components/transcriptions/transcribe/transcribe.component';
import { UsetermsComponent } from './components/main/useterms/useterms.component';

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
    MainComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TranscribeComponent,
    UsetermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
