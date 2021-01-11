import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineOfflineRoutingModule } from './online-offline-routing.module';
import { OnlineOfflineComponent } from './online-offline.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { VehicleStatusComponent } from '../vehicle-status/vehicle-status.component';
import { VehicleStatusModule } from '../vehicle-status/vehicle-status.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [OnlineOfflineComponent],
  imports: [
    CommonModule,
    OnlineOfflineRoutingModule,
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
    VehicleStatusModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class OnlineOfflineModule { }
