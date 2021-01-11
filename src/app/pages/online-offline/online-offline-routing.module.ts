import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineOfflineComponent } from './online-offline.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: OnlineOfflineComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineOfflineRoutingModule { }
