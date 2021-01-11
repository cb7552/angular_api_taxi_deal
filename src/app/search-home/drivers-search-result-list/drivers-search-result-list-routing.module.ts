import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverSearchResultComponent } from './drivers-search-result-list.component';

const routes: Routes = [{
  path: '',
  component: DriverSearchResultComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }
