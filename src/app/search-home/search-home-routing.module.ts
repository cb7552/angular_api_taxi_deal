import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchHomeComponent } from './search-home.component';

const routes: Routes = [{
  path: '',
  component: SearchHomeComponent,
  children: [
    { path: '', loadChildren: './search-dashboard/search-dashboard.module#SearchDashboardModule' },
    { path: 'search-result/:id/:driverid', loadChildren: './search-result/search-result.module#SearchResultModule' },
    { path: 'search-taxi', loadChildren: './drivers-search-result-list/drivers-search-result-list.module#DriverSearchResultModule' },
    { path: 'search-car-details/:driverid', loadChildren: './search-car-details/search-car-details.module#CarSearchResultModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHomeRoutingModule { }
