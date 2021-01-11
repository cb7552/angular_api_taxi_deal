import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverToptupRoutingModule } from './driver-toptup-routing.module';
import { DriverToptupComponent } from './driver-toptup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ControlMessagesModule } from 'src/app/shared';

@NgModule({
  declarations: [DriverToptupComponent],
  imports: [
    CommonModule,
    DriverToptupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class DriverToptupModule { }
