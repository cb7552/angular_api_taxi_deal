import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap/rating';

import { SharedPipesModule } from '../@core/pipes/shared-pipes.module';
import { ControlMessagesModule, PageHeaderModule, PageFooterModule } from '../shared';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { SearchDashboardModule } from './search-dashboard/search-dashboard.module';
import { SearchHomeRoutingModule } from './search-home-routing.module';
import { SearchHomeComponent } from './search-home.component';
import { SearchResultModule } from './search-result/search-result.module';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { SearchCarDetailsComponent } from './search-car-details/search-car-details.component';

@NgModule({
  declarations: [SearchHomeComponent],
  imports: [
    CommonModule,
    SearchHomeRoutingModule,
    SearchResultModule,
    SearchDashboardModule,
    PageHeaderModule,
    PageFooterModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }, isolate: true
    }),
    AlertModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    SharedPipesModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SearchHomeModule { }
