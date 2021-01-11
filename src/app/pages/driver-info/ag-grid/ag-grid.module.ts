import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AgGridComponent } from './ag-grid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VehicleStatusModule } from '../../vehicle-status/vehicle-status.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';
import { SharedPipesModule } from 'src/app/@core/pipes/shared-pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';


@NgModule({
  declarations: [AgGridComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VehicleStatusModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
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
    NgxPaginationModule,
    AgmJsMarkerClustererModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AgGridModule { }
