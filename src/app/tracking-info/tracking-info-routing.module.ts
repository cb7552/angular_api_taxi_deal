import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingInfoComponent } from './tracking-info.component';

const routes: Routes = [{
  path: '',
  component: TrackingInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingInfoRoutingModule { }
