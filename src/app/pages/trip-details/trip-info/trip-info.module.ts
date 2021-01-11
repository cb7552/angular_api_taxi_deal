import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripInfoRoutingModule } from './trip-info-routing.module';
import { TripInfoComponent } from './trip-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [TripInfoComponent],
  imports: [
    CommonModule,
    TripInfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class TripInfoModule { }
