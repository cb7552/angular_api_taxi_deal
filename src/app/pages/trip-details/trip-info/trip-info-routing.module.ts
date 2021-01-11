import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripInfoComponent } from './trip-info.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: TripInfoComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripInfoRoutingModule { }
