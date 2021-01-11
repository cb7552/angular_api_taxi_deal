import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './drivers-search-result-list-routing.module';
import { DriverSearchResultComponent } from './drivers-search-result-list.component';
import { ControlMessagesModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RatingModule } from 'ng-starrating';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [DriverSearchResultComponent],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    AgmCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RatingModule,
    DateTimePickerModule
  ],
  providers: [],
  bootstrap: [ DriverSearchResultComponent ]
})
export class DriverSearchResultModule { }








