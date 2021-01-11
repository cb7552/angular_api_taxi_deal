import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { DriverListRoutingModule } from './driver-list-routing.module';
import { DriverListComponent } from './driver-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [DriverListComponent],
  imports: [
    CommonModule,
    DriverListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    Ng2OrderModule,
    SharedPipesModule,
    NgbModalModule,
    NgxPaginationModule
  ]
})
export class DriverListModule { }
