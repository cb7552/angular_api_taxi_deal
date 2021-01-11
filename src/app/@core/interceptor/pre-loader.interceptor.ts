import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpEvent,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
declare var $: any;

@Injectable()
export class PreLoaderInterceptor implements HttpInterceptor {
    private callCount = 0;
    constructor() { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.headers.get('no-loader') === 'true') {
            return next.handle(request);
        } else {
            this.showBusyLoader();
            this.callCount++;
            return next.handle(request).pipe(tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.callCount--;
                        if (this.callCount === 0) {
                            this.hideBusyLoader();
                        }
                    }
                },
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        this.callCount--;
                        if (this.callCount === 0) {
                            this.hideBusyLoader();
                        }
                        if(error){
                             // console.log(error);
                        }
                    }
                }
            ));
        }

    }

    showBusyLoader() {
        $('#loaderAnimation').show();
    }

    hideBusyLoader() {
        $('#loaderAnimation').hide();
    }
}
