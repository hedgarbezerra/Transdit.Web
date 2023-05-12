import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule, NgIf} from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialExportModule } from './helpers/material.module';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';


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
import { UseinformationsComponent } from './components/main/useinformations/useinformations.component';
import { UserMainComponent } from './components/users/user-main/user-main.component';
import { TranscriptionItemComponent } from './components/transcriptions/transcription-item/transcription-item.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthInterceptor, UnauthenticatedInterceptor } from './helpers/AuthInterceptor';
import { RequestLoaderInterceptor } from './helpers/RequestLoaderInterceptor';
import { LoadingSpinnerComponent } from './components/main/loading-spinner/loading-spinner.component';
import { ErrorHandlingHttpInterceptor } from './helpers/ErrorHandlingHttpInterceptor';
import { PaginatorPtbrComponent, PaginatorPtbrService } from './components/main/paginator-ptbr/paginator-ptbr.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranscriptionItemExportconfirmComponent } from './components/transcriptions/transcription-item-exportconfirm/transcription-item-exportconfirm.component';
import { MomentsFromNowPipe, PercentagePipe, SecondsToPlaytimePipe } from './helpers/diretives/MomentsFromNow.pipe';
import { TranscriptionItemTranscribeconfirmComponent } from './components/transcriptions/transcription-item-transcribeconfirm/transcription-item-transcribeconfirm.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { NewDictionaryComponent } from './components/custom-dictionary/new-dictionary/new-dictionary.component';
import { RemoveWordConfirmComponent } from './components/custom-dictionary/remove-word-confirm/remove-word-confirm.component';
import { TranscribeConfirmComponent } from './components/transcriptions/transcribe-confirm/transcribe-confirm.component';
import { TranscribeResultComponent } from './components/transcriptions/transcribe-result/transcribe-result.component';
import { TranscribeResultItemComponent } from './components/transcriptions/transcribe-result-item/transcribe-result-item.component';


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
    UsetermsComponent,
    UseinformationsComponent,
    UserMainComponent,
    TranscriptionItemComponent,
    LoadingSpinnerComponent,
    PaginatorPtbrComponent,
    TranscriptionItemExportconfirmComponent,
    TranscriptionItemTranscribeconfirmComponent,
    NotFoundComponent,
    NewDictionaryComponent,
    RemoveWordConfirmComponent,
    TranscribeConfirmComponent,
    TranscribeResultComponent,
    TranscribeResultItemComponent,

    MomentsFromNowPipe,
    SecondsToPlaytimePipe,
    PercentagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExportModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: UnauthenticatedInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingHttpInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: RequestLoaderInterceptor, multi: true},
    {provide: MatPaginatorIntl, useClass: PaginatorPtbrService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
