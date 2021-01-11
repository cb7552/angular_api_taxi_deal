import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { PageHeaderModule, ControlMessagesModule } from '../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { BrowserModule } from '@angular/platform-browser';

import { TrackingComponent } from './tracking.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [TrackingComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AlertModule,
    InternationalPhoneNumberModule
  ]

})
export class TrackingModule { }


