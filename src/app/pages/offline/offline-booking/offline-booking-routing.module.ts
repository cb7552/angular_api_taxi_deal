import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineBookingComponent } from './offline-booking.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: OfflineBookingComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineBookingRoutingModule { }
