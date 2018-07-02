import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errAlert: boolean = false;
  successAlert: boolean = false;
  errorMessage: String;
  message: any;
  constructor(private api: ApiService, private _router: Router) {
  }

  register(form: NgForm) {
    this.errAlert = false;
    if (form.value) {
      this.api.loginApi(form.value, 'register').subscribe(res => {
        this.successAlert = true;
        this.message = res.success;
        setTimeout(() => {
          this.successAlert = false;
          this._router.navigate(['/login'])
        }, 5000)
      }, err => {
        this.errAlert = true;
        this.message = err.error.message;
      })
    }
  }

  ngOnInit() {
  }

}
