import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { PageHeaderModule } from '../shared';
import { ControlMessagesModule } from '../shared/modules/control-messages/control-messages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from '../app.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateModule, TranslateLoader } from '../@core/custometranslate.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    ImageCropperModule,
    // TranslateModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
     }),
    AlertModule,
    NgxPasswordToggleModule,
    InternationalPhoneNumberModule
  ]
})
export class RegistrationModule { }
