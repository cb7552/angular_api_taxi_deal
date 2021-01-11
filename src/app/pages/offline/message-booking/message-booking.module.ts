import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageBookingRoutingModule } from './message-booking-routing.module';
import { MessageBookingComponent } from './message-booking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/shared';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';

@NgModule({
  declarations: [MessageBookingComponent],
  imports: [
    CommonModule,
    MessageBookingRoutingModule,
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
  ]
})
export class MessageBookingModule { }
