import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverStatusComponent } from './driver-status.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: DriverStatusComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverStatusRoutingModule { }
