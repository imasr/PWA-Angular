import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(
    ) { }

    canActivate() {
        let jwt = new JwtHelperService();
        let isTokenExpired = jwt.isTokenExpired(localStorage.getItem('accessToken'));
        if (!isTokenExpired) {
            return true
        }
        return false
    }
    canLoad() {
        let jwt = new JwtHelperService();
        let isTokenExpired = jwt.isTokenExpired(localStorage.getItem('accessToken'));
        if (!isTokenExpired) {
            return true
        }
        return false
    }
}