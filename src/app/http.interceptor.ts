import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntercepterHttp implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cloneReq = request.clone({
          headers: request.headers.set( 'Content-Type', 'application/json')
        });

        return next.handle(cloneReq);
  }
}