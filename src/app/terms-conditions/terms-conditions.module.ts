import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsConditionsComponent } from './terms-conditions.component';
import { PageHeaderModule, ControlMessagesModule } from '../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';

@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
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
    AlertModule
  ]
})
export class TermsConditionsModule { }
