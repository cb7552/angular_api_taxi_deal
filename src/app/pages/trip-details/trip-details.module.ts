import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripDetailsRoutingModule } from './trip-details-routing.module';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { TripDetailsComponent } from './trip-details.component';
import { TripHistoryModule } from './trip-history/trip-history.module';
import { TripInfoModule } from './trip-info/trip-info.module';
import { TripServices } from './_services/_trip.component.services';

@NgModule({
  declarations: [TripDetailsComponent],
  imports: [
    CommonModule,
    TripDetailsRoutingModule,
    TripHistoryModule,
    TripInfoModule
  ],
  providers: [TripServices]
})
export class TripDetailsModule { }
