import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleStatusComponent } from './vehicle-status.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: VehicleStatusComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleStatusRoutingModule { }
