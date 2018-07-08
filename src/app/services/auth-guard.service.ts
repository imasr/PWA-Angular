import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
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
}