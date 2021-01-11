import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalComponent } from './approval.component';
import { AuthGuard } from '../../@core/guard/auth.guard';

const routes: Routes = [{
  path: '',
  component: ApprovalComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
