import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripHistoryRoutingModule } from './trip-history-routing.module';
import { TripHistoryComponent } from './trip-history.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TripHistoryComponent],
  imports: [
    CommonModule,
    TripHistoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PaginationModule,
    Ng2OrderModule,
    SharedPipesModule,
    NgbModalModule,
    NgxPaginationModule
  ]
})
export class TripHistoryModule { }
