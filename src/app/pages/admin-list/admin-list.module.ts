import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminListRoutingModule } from './admin-list-routing.module';
import { AdminListComponent } from './admin-list.component';

@NgModule({
  declarations: [AdminListComponent],
  imports: [
    CommonModule,
    AdminListRoutingModule
  ]
})
export class AdminListModule { }
