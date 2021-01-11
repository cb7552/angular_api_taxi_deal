import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { ControlMessagesModule } from '../shared/modules/control-messages/control-messages.module';
import { AlertModule } from '../shared/modules/alert/alert.module';
import { createTranslateLoader } from 'src/app/app.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { PageFooterModule } from '../shared/modules/page-footer/footer.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PageHeaderModule,
    PageFooterModule,
    ControlMessagesModule,
    AlertModule,
    NgxPasswordToggleModule
  ]
})
export class LoginModule { }
