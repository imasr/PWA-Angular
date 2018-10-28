import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IntercepterHttp implements HttpInterceptor {
    constructor(
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloneReq;
        if (request.urlWithParams.indexOf('fcm') > 0) {
            cloneReq = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
                    .set('Authorization', 'key=AAAAxzD_Yog:APA91bEENm4orEGjtgZNWp9Au-1jcgb8Cl5coodHJQRSxsWo7k7YOeS-EuUHGkJ_An2QxFuAWLoz2Sr71i9_DL9CBOPFqlqOA4mzESPDYfKDmzsvEmDjW2LGzNRulbfHiYiBSk1PnTf96zsSITfdYmaNmWYf3YvCIg')
            })
        } else if (request.urlWithParams.indexOf('/sociallogin') > 0 || request.urlWithParams.indexOf('/login') > 0 || request.urlWithParams.indexOf('/register') > 0) {
            cloneReq = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
            })
        } else {
            cloneReq = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
                    .set('Authorization', localStorage.getItem('accessToken') || '')
            })
        }

        return next.handle(cloneReq).pipe(
            catchError(response => {
                if (response instanceof HttpErrorResponse) {
                    if ((response.status === 401 || response.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                        window.localStorage.setItem('loginMessage', JSON.stringify('Token Expire. Please login Again.'));
                        const getUrl = window.location;
                        const baseUrl = getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1];
                        // window.location.replace(baseUrl);
                    }
                    if (response.status === 0 || response.status === 504) {
                        response.error.status = 0,
                            response.error.message = "Network connection error"
                    }
                    return throwError(response);
                }
            })
        )
    }
}