import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

    errAlert: boolean = false;
    successAlert: boolean = false;
    errorMessage: String;
    message: any;
    loader: boolean = false;
    constructor(
        private api: ApiService
    ) { }

    forget(form: NgForm) {
        this.errAlert = false;
        if (form.value) {
            this.loader = true
            this.api.authApi(form.value, 'forget').subscribe(res => {
                this.loader = false
                this.successAlert = true;
                this.message = res.message;
                form.resetForm()
            }, err => {
                this.loader = false
                this.errAlert = true;
                this.message = err.error.message;
            })
        }
    }

    ngOnInit() {
    }

}
