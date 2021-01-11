import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineComponent } from './offline.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: OfflineComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'message-booking', loadChildren: './message-booking/message-booking.module#MessageBookingModule' },
    { path: 'offline-booking', loadChildren: './offline-booking/offline-booking.module#OfflineBookingModule' },
    { path: 'offline-book-sms', loadChildren: './offline-book-sms/offline-book-sms.module#OfflineBookSmsModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineRoutingModule { }
