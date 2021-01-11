import { AgmCoreModule } from '@agm/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { RatingModule } from 'ng-starrating';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { environment } from 'src/environments/environment';

import { AngularFirestore } from '../../node_modules/@angular/fire/firestore';
import { CoreModule } from './@core/core.module';
import { AuthTokenInterceptor } from './@core/interceptor/auth-token.interceptor';
import { SharedPipesModule } from './@core/pipes/shared-pipes.module';
import { MessagingService } from './@core/services/messaging.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsModule } from './contacts/contacts.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { SearchHomeModule } from './search-home/search-home.module';
import { PageFooterModule, PageHeaderModule } from './shared';
import { AlertModule } from './shared/modules/alert/alert.module';
import { TermsConditionsModule } from './terms-conditions/terms-conditions.module';
import { TrackingInfoModule } from './tracking-info/tracking-info.module';
import {DpDatePickerModule} from 'ng2-date-picker';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgOtpInputModule } from  'ng-otp-input';
import { AgGridModule } from 'ag-grid-angular';
import { HelpsModule } from './helps/helps.module';
import { HelpsComponent } from './helps/helps.component'


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),
    CoreModule.forRoot(),
    SharedPipesModule,
    LoginModule,
    RegistrationModule,
    ContactsModule,
    SearchHomeModule,
    AlertModule,
    PageFooterModule,
    TermsConditionsModule,
    PageHeaderModule,
    InternationalPhoneNumberModule,
    RatingModule,
    // TrackingModule,
    TrackingInfoModule,
    DpDatePickerModule,
    DateTimePickerModule,
    NgOtpInputModule,
    HelpsModule,
    AgGridModule.withComponents(null),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }, AngularFirestore,
    AsyncPipe,
    NotificationsService,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
