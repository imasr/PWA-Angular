import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    authApi(body, uri): Observable<any> {
        return this.http.post(`${environment.baseUrl}/${uri}`, body)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    allUsers(): Observable<any> {
        this.commonService.loadingSet(true);
        return this.http.get(`${environment.baseUrl}/users`)
            .pipe(
                map(res => {
                    this.commonService.loadingSet(false);
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    deleteUser(body: any): Observable<any> {
        this.commonService.loadingSet(true);
        return this.http.post(`${environment.baseUrl}/users/delete`, body)
            .pipe(
                map(res => {
                    this.commonService.loadingSet(false);
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    getUserById(id): Observable<any> {
        this.commonService.loadingSet(true);
        return this.http.get(`${environment.baseUrl}/users/${id}`)
            .pipe(
                map(res => {
                    this.commonService.loadingSet(false);
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    uploadProfileImage(file): Observable<any> {
        this.commonService.loadingSet(true);
        return this.http.post(`${environment.baseUrl}/users/uploadProfileIphoto`, file)
            .pipe(
                map(res => {
                    this.commonService.loadingSet(false);
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    setUserStatus(query): Observable<any> {
        this.commonService.loadingSet(true);
        return this.http.get(`${environment.baseUrl}/users/status/?${query}`)
            .pipe(
                map(res => {
                    this.commonService.loadingSet(false);
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    setStatusDestroy() {
        return new Promise((resolve, reject) => {
            this.setUserStatus(`presence=no`).subscribe(user => {
                resolve(true)
            });
        })

    }
    setStatusOnline() {
        return new Promise((resolve, reject) => {
            this.setUserStatus(`presence=yes`).subscribe(user => {
                resolve(true)
            });
        })

    }
    sendPosition(body): Observable<any> {
        return this.http.post(`${environment.baseUrl}/trace`, body)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
    getChat(room) {
        return this.http.get(`${environment.baseUrl}/users/chats/${room}`)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err || 'Server error');
                })
            );
    }
}
