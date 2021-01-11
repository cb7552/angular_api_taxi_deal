import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JsonContentTypeHeaderInterceptor implements HttpInterceptor {
    constructor() {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.headers.get('ctype') !== 'file') {
            request = request.clone({
                headers: request.headers.set('Content-Type', `application/json`)
            });
        }
        return next.handle(request);
    }
}
