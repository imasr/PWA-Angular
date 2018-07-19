import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IntercepterHttp implements HttpInterceptor {
  constructor(
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq;
    if (request.urlWithParams.indexOf('fcm') > 0) {
      cloneReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          .set('Authorization', 'AAAAo8RvyOE:APA91bFBQ1gCezJqTQW__UxSy_-7-qR8PPSzGMcESAY-Vt3zcJRhnLss6uHIha3YSUDl_1jsXqgw_oZ0Fec7QhaAxv2iDuoEBL6aFXltoeqh0zenKwBODHdlksznf3_2yWcrnVeU9ZNJ2vQ7eaiZSlFECm6iEiWrCw')
      })
    } else if (request.urlWithParams.indexOf('sociallogin') > 0 || request.urlWithParams.indexOf('login') > 0 || request.urlWithParams.indexOf('register') > 0) {
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
            window.location.replace(baseUrl);
          }
          return throwError(response);
        }
      })
    )
  }
}