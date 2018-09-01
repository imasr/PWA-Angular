import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    alert: boolean = false;
    message: any;
    loader: boolean = false;

    constructor(
        private api: ApiService
    ) { }

    register(form: NgForm) {
        this.loader = true;
        this.alert = false;
        if (form.value) {
            this.api.authApi(form.value, 'register').subscribe(res => {
                this.loader = false;
                this.alert = true;
                this.message = res;
                setTimeout(() => {
                    form.resetForm()
                }, 10000)
            }, err => {
                this.loader = false;
                this.alert = true;
                this.message = err;
            })
        }
    }

    ngOnInit() {
    }

}
