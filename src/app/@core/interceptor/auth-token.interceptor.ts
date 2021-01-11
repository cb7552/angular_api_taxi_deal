
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private storage: SessionStorageService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storage.getObj('token');
        if (authToken) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${authToken.jwt}`)
            });
        }
        return next.handle(request);
    }
}
