import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewDriverRoutingModule } from './add-new-driver-routing.module';
import { AddNewDriverComponent } from './add-new-driver.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlMessagesModule } from '../../../shared/modules/control-messages/control-messages.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [AddNewDriverComponent],
  imports: [
    CommonModule,
    AddNewDriverRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    NgxPasswordToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    InternationalPhoneNumberModule,
    NgOtpInputModule
  ]
})
export class AddNewDriverModule { }
