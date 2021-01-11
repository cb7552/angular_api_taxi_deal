import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { VehicleStatusComponent } from '../vehicle-status/vehicle-status.component';
import { VehicleStatusModule } from '../vehicle-status/vehicle-status.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
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
    VehicleStatusModule,
    InternationalPhoneNumberModule,
    SharedPipesModule,
    Ng2OrderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContactModule { }
