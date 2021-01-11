import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineBookSmsComponent } from './offline-book-sms.component';
import { AuthGuard } from 'src/app/@core/guard';

const routes: Routes = [{
  path: '',
  component: OfflineBookSmsComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineBookSmsRoutingModule { }
