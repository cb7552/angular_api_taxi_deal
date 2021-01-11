import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripDetailsComponent } from './trip-details.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: TripDetailsComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'trip-history', loadChildren: './trip-history/trip-history.module#TripHistoryModule' },
    { path: 'trip-info/:tripId', loadChildren: './trip-info/trip-info.module#TripInfoModule' }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripDetailsRoutingModule { }
