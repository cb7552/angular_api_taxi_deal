import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RideCalculationRoutingModule } from './ride-calculation-routing.module';
import { RideCalculationComponent } from './ride-calculation.component';
import { PageHeaderModule, ControlMessagesModule } from '../../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
//import { AlertModule } from '../../shared/modules/alert/alert.module';
import { AlertModule } from '../../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';
import { AgmCoreModule } from '@agm/core';
import { from } from 'rxjs';

@NgModule({
  declarations: [RideCalculationComponent],
  imports: [
    CommonModule,
    RideCalculationRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnBQEmJgRbBsU7CKYCxxP5b_UpC29n-h0'
    }),
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
export class RideCalculationModule { }
