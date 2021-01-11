import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDashboardRoutingModule } from './search-dashboard-routing.module';
import { SearchDashboardComponent } from './search-dashboard.component';
import { PageHeaderModule, ControlMessagesModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HttpClient } from '@angular/common/http';
import { AlertModule } from 'src/app/shared/modules/alert/alert.module';
import { AgmCoreModule } from '@agm/core';
import { RatingModule, TabsModule } from 'ngx-bootstrap';
import { createTranslateLoader } from 'src/app/app.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [SearchDashboardComponent],
  imports: [
    CommonModule,
    SearchDashboardRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule,
    AlertModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
     DateTimePickerModule 
  ]
})
export class SearchDashboardModule { }


