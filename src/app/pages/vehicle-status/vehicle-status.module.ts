import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleStatusRoutingModule } from './vehicle-status-routing.module';
import { VehicleStatusComponent } from './vehicle-status.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [VehicleStatusComponent],
  imports: [
    CommonModule,
    VehicleStatusRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    })
  ]
})
export class VehicleStatusModule { }
