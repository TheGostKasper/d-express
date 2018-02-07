import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthenticationService } from './app.authentication';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let _req = req;
        if (!req.url.includes('/login')) {
            const authHeader = localStorage.getItem('token');
            _req = req.clone({
                headers: req.headers.set('Authorization', authHeader)
            });
        }
        return next.handle(_req).do(
            succ => console.log(succ),
            err => console.log(err.status)
        );
    }
}
