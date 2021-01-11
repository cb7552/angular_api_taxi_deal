import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineBookingRoutingModule } from './offline-booking-routing.module';
import { OfflineBookingComponent } from './offline-booking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/shared';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { OfflineService } from '../_services/_offline.component.services';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { createTranslateLoader } from 'src/app/app.module';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [OfflineBookingComponent],
  imports: [
    CommonModule,
    OfflineBookingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule,
    InternationalPhoneNumberModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class OfflineBookingModule { }
