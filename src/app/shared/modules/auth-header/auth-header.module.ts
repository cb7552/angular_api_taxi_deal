import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

import { AuthHeaderRoutingModule } from './auth-header-routing.module';
import { AuthHeaderComponent } from './auth-header.component';


@NgModule({
  declarations: [AuthHeaderComponent],
  imports: [
    CommonModule,
    AuthHeaderRoutingModule
    , ReactiveFormsModule, FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [AuthHeaderComponent]
})
export class AuthHeaderModule { }
