import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from '../api.service';

declare const FB: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  private auth2: any;
  errAlert:boolean= false;
  successAlert:boolean=false;
  errorMessage: String;
  message: any;
  constructor(private api: ApiService){
  }

  login(form:NgForm){
    this.errAlert=false;
    if(!form.value){
      this.api.loginApi(form.value, 'login').subscribe(res=>{
        console.log(res)
      },err=>{
        this.message=err.error.message;
        this.errAlert=true;                        
      })
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "994467216886-prklid7qff7p4r3bp5q8ae5e5dh0pmpj.apps.googleusercontent.com",
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
      }).then((success)=> {
          console.log('Libraries are initialized successfully');
      }).catch((error) => {
          console.log(error)//to find the reason
      });
    });
  }
  onSignInGoogle(googleUser) {
    gapi.auth2.getAuthInstance().signIn().then(
      function(res) {
        console.log(res)
      },
      function(error) {
        console.log(error) //to find the reason
      }
    );
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
    }, { scope: 'user_friends,email' });
   }
  testAPIfb() {
     FB.api('/me?fields=id,email,name,gender,picture.width(150).height(150)', (res) => {
      console.log('Welcome!  Fetching your information.... ',res);
     })
  }
  
  ngAfterViewInit(){
      this.googleInit();
      FB.init({ 
        appId: '1987072331609874',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.4'
      });
      FB.getLoginStatus((response)=> {
        this.statusChangeCallback(response);
      });
  }

}
