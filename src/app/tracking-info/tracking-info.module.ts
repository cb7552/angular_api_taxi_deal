import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { environment } from 'src/environments/environment';

import { createTranslateLoader } from '../app.module';
import { ControlMessagesModule, PageHeaderModule } from '../shared';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { TrackingInfoRoutingModule } from './tracking-info-routing.module';
import { TrackingInfoComponent } from './tracking-info.component';

@NgModule({
  declarations: [TrackingInfoComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    TrackingInfoRoutingModule,
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
export class TrackingInfoModule { }
