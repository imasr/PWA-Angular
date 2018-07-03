import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { environment } from "./../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    authApi(body, uri): Observable<any> {
        return this.http.post(`${environment.baseUrl}/${uri}`, body)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error')
                })
            )
    }
    allUsers(uri): Observable<any> {
        return this.http.get(`${environment.baseUrl}/${uri}`)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error')
                })
            )
    }
}
