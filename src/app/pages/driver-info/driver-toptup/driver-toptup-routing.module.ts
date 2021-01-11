import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverToptupComponent } from './driver-toptup.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: DriverToptupComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverToptupRoutingModule { }
