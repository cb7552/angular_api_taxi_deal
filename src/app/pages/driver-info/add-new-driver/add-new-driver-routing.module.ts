import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewDriverComponent } from './add-new-driver.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: AddNewDriverComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewDriverRoutingModule { }
