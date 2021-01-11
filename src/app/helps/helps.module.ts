import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpsRoutingModule } from './helps-routing.module';
import { HelpsComponent } from './helps.component';
import { PageHeaderModule, ControlMessagesModule } from '../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [HelpsComponent],
  imports: [
    CommonModule,
    HelpsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
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
export class HelpsModule { }
