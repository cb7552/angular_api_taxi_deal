import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineBookSmsRoutingModule } from './offline-book-sms-routing.module';
import { OfflineBookSmsComponent } from './offline-book-sms.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlMessagesModule } from '../../../shared/modules/control-messages/control-messages.module';
import { OfflineService } from '../_services/_offline.component.services';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { createTranslateLoader } from 'src/app/app.module';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [OfflineBookSmsComponent],
  imports: [
    CommonModule,
    OfflineBookSmsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    InternationalPhoneNumberModule
  ]
})
export class OfflineBookSmsModule { }
