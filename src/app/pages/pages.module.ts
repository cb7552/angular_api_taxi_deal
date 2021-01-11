import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageHeaderModule, AuthHeaderModule } from '../shared';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { OnlineOfflineComponent } from './online-offline/online-offline.component';
import { OnlineOfflineModule } from './online-offline/online-offline.module';
import { VehicleStatusComponent } from './vehicle-status/vehicle-status.component';
import { VehicleStatusModule } from './vehicle-status/vehicle-status.module';
import { ProfileComponent } from './profile/profile.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ApprovalComponent } from './approval/approval.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { OfflineComponent } from './offline/offline.component';
import { OfflineBookingComponent } from './offline/offline-booking/offline-booking.component';
import { OfflineBookSmsComponent } from './offline/offline-book-sms/offline-book-sms.component';
import { AdminListModule } from './admin-list/admin-list.module';
import { ApprovalModule } from './approval/approval.module';
import { DriverInfoModule } from './driver-info/driver-info.module';
import { ProfileModule } from './profile/profile.module';
import { TripDetailsModule } from './trip-details/trip-details.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CoreModule } from '../@core/core.module';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { ContactComponent } from './contact/contact.component';
import { ContactModule } from './contact/contact.module';
import { AgGridModule } from 'ag-grid-angular';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AlertModule,
    AuthHeaderModule,
    DashboardModule,
    OnlineOfflineModule,
    VehicleStatusModule,
    AdminListModule,
    ApprovalModule,
    AdminListModule,
    ApprovalModule,
    DriverInfoModule,
    ProfileModule,
    TripDetailsModule,
    SharedPipesModule,
    ContactModule,
    AgGridModule
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // })
  ]
})
export class PagesModule { }
