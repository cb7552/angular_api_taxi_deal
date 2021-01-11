import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { ControlMessagesModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RatingModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [SearchResultComponent],
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
    RatingModule.forRoot(),
  ]
})
export class SearchResultModule { }
