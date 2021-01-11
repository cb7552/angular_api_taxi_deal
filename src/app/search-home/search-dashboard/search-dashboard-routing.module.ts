import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDashboardComponent } from './search-dashboard.component';

const routes: Routes = [{
  path: '',
  component: SearchDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchDashboardRoutingModule { }
