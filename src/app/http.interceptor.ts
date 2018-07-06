import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class IntercepterHttp implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
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

    return next.handle(cloneReq).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if ((response.status === 401 || response.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
            window.localStorage.setItem('loginMessage', JSON.stringify('Token Expire. Please login Again.'));
            this.router.navigate(['login'])
          }
          return throwError(response);
        }
      })
    )
  }
}