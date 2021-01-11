import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalServices } from './_services/_approval.component.services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [ApprovalComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }, isolate: true
    })
  ],
  providers: [ApprovalServices]
})
export class ApprovalModule { }
