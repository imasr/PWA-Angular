import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    let jwt = new JwtHelperService();
    let isTokenExpired = jwt.isTokenExpired(localStorage.getItem('accessToken'));
    if (!isTokenExpired) {
      return true
    }
    this.router.navigate(['login']);
    return false
  }
}