import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { PageHeaderModule, ControlMessagesModule } from '../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
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
export class ContactsModule { }
