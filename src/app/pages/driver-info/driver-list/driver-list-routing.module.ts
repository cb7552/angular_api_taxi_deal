import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverListComponent } from './driver-list.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: DriverListComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverListRoutingModule { }
