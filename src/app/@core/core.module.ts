import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorDisplay } from './common/errorDisplay';
import { throwIfAlreadyLoaded } from './common/module-import-guard';
import { EntityModule } from './entity.module';
import { GuardModule } from './guard.module';
import { ServiceModule } from './service.module';
import { ControlMessagesModule } from '../shared/modules/control-messages/control-messages.module';
import { TranslateModule } from '@ngx-translate/core';

const NB_CORE_PROVIDERS = [...EntityModule.forRoot().providers, ...ServiceModule.forRoot().providers, ...GuardModule.forRoot().providers];

@NgModule({
  imports: [CommonModule, BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, ControlMessagesModule, TranslateModule],
  exports: [],
  declarations: [ErrorDisplay]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS]
    };
  }
}
