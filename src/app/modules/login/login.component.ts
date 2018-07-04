import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

declare const FB: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  private auth2: any;
  errAlert: boolean = false;
  successAlert: boolean = false;
  errorMessage: String;
  message: any;
  constructor(
    private api: ApiService,
    private storageService: LocalStorageService,
    private _router: Router
  ) { }

  login(form: NgForm) {
    this.errAlert = false;
    if (form.value) {
      this.api.authApi(form.value, 'login').subscribe(res => {
        if (res.token) {
          this.storageService.setLocalStorage('accessToken', res.token)
          this.storageService.setLocalStorage('login', res.success)
          this._router.navigate(['/dashboard']);
        }
      }, err => {
        this.errAlert = true;
        this.message = err.error.message;
      })
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "994467216886-prklid7qff7p4r3bp5q8ae5e5dh0pmpj.apps.googleusercontent.com",
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
      }).then((success) => {
        console.log('Libraries are initialized successfully');
      }).catch((error) => {
        console.log(error)//to find the reason
      });
    });
  }
  onSignInGoogle(event) {
    let googleAuth = gapi.auth2.getAuthInstance()
    googleAuth.signIn().then(googleUser => {
      let profile = googleUser.getBasicProfile();
      let googleData = {
        "google_id": profile.getId(),
        "username": profile.getName(),
        "image_url": profile.getImageUrl(),
        "email": profile.getEmail()
      };
      console.log(googleData);
      this.api.loginGoogle(googleData).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })

    }).catch(error => {
      console.log(error) //to find the reason
    })
  }

  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
      console.log('connected');
    } else {
      console.log('loginnn required');
    }
  }
  loginFb() {
    FB.login((result) => {
      if (result.status === 'connected') {
        this.testAPIfb();
      }
    }, { scope: 'email' });
  }
  testAPIfb() {
    FB.api('/me?fields=id,email,name,gender,birthday,picture.width(150).height(150)', (res) => {
      let fbdata = {
        'email': res.email,
        'username': res.name,
        'gender': res.gender,
        'image_url': res.picture.data.url,
        'fb_id': res.id,
        'birthday': res.birthday
      };
      console.log(fbdata);

      this.api.loginFb(fbdata).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    })
  }

  ngAfterViewInit() {
    this.googleInit();
    FB.init({
      appId: '1987072331609874',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

}
