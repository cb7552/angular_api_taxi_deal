import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverInfoComponent } from './driver-info.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: DriverInfoComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'add-new-driver', loadChildren: './add-new-driver/add-new-driver.module#AddNewDriverModule' },
    { path: 'driver-status', loadChildren: './driver-status/driver-status.module#DriverStatusModule' },
    { path: 'driver-toptup', loadChildren: './driver-toptup/driver-toptup.module#DriverToptupModule' },
    { path: 'driver-list', loadChildren: './driver-list/driver-list.module#DriverListModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverInfoRoutingModule { }
