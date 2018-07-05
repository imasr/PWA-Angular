import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntercepterHttp implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq;
    if (request.urlWithParams.indexOf('sociallogin') > 0 || request.urlWithParams.indexOf('login') > 0 || request.urlWithParams.indexOf('register') > 0) {
      cloneReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      })
    } else {
      cloneReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          .set('Authorization', localStorage.getItem('accessToken') || '')
      })
    }

    return next.handle(cloneReq);
  }
}