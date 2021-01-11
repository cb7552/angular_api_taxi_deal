import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripHistoryComponent } from './trip-history.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: TripHistoryComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripHistoryRoutingModule { }
