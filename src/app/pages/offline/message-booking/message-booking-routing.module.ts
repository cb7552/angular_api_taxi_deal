import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageBookingComponent } from './message-booking.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: MessageBookingComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageBookingRoutingModule { }
