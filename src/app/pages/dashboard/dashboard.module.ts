import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardServices } from './_services/_dashboard.component.services';
import { ControlMessagesModule } from 'src/app/shared';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule,
    ControlMessagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }, isolate: true
    }),
    SharedPipesModule,
    Ng2OrderModule,
    FormsModule],
  providers: [DashboardServices]
})
export class DashboardModule { }
