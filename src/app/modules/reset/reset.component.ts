import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  errAlert: boolean = false;
  successAlert: boolean = false;
  errorMessage: String;
  message: any;
  constructor(
    private api: ApiService
  ) { }

  reset(form: NgForm) {
    this.errAlert = false;
    if (form.value) {
      this.api.authApi(form.value, 'reset').subscribe(res => {
        this.successAlert = true;
        this.message = res.success;
      }, err => {
        this.errAlert = true;
        this.message = err.error.message;
      })
    }
  }

  ngOnInit() {
  }

}
