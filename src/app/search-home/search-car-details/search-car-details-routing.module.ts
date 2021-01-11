import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCarDetailsComponent } from './search-car-details.component'

const routes: Routes = [{
  path: '',
  component: SearchCarDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCarResultRoutingModule { }
