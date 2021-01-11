import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { VehicleStatusComponent } from './vehicle-status/vehicle-status.component';
import { AuthGuard } from '../@core/guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'admin-list',
        loadChildren: './admin-list/admin-list.module#AdminListModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'approval',
        loadChildren: './approval/approval.module#ApprovalModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'driver-info',
        loadChildren: './driver-info/driver-info.module#DriverInfoModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'offline',
        loadChildren: './offline/offline.module#OfflineModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'online-offline',
        loadChildren: './online-offline/online-offline.module#OnlineOfflineModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'trip-details',
        loadChildren: './trip-details/trip-details.module#TripDetailsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'vehicle-status',
        loadChildren: './vehicle-status/vehicle-status.module#VehicleStatusModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'ride-calculation',
        loadChildren: './ride-calculation/ride-calculation.module#RideCalculationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule',
        canActivate: [AuthGuard]
      }
    ],
    data: {
      screen: { modules: ['pages', 'menus'], skip: false }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
