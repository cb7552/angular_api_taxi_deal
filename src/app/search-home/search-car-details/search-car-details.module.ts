import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { SearchCarResultRoutingModule } from './search-car-details-routing.module';
import { SearchCarDetailsComponent } from './search-car-details.component';
import { ControlMessagesModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RatingModule } from 'ng-starrating';
import {DpDatePickerModule} from 'ng2-date-picker';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';


@NgModule({
  declarations: [SearchCarDetailsComponent],
  imports: [
    CommonModule,
    SearchCarResultRoutingModule,
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
    DpDatePickerModule,
    DateTimePickerModule,
    InternationalPhoneNumberModule
  ],
  providers: [],
  bootstrap: [ SearchCarDetailsComponent ]
})
export class CarSearchResultModule { }

















