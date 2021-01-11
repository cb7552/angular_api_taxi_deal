import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';

import { AuthErrorHandler } from './handler/auth-error.handler';
import { AuthTokenInterceptor } from './interceptor/auth-token.interceptor';
import { JsonContentTypeHeaderInterceptor } from './interceptor/json-content-type.interceptor';
import { PreLoaderInterceptor } from './interceptor/pre-loader.interceptor';
import { AuthService, DataStoreService, LocalStorageService, SeoService, SessionStorageService } from './services';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';

// Services
// tslint:disable-next-line:max-line-length
const SERVICES = [AuthService, HttpService, LocalStorageService, SessionStorageService, SeoService, DataStoreService, AlertService];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeHeaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: PreLoaderInterceptor, multi: true },
        { provide: ErrorHandler, useClass: AuthErrorHandler, multi: false },
        ...SERVICES
      ]
    };
  }
}
