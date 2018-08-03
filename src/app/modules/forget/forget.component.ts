import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

    alert: boolean = false;
    message: any;
    loader: boolean = false;
    constructor(
        private api: ApiService
    ) { }

    forget(form: NgForm) {
        this.alert = false;
        if (form.value) {
            this.loader = true
            this.api.authApi(form.value, 'forget').subscribe(res => {
                this.loader = false
                this.alert = true;
                this.message = res;
                form.resetForm()
            }, err => {
                this.loader = false
                this.alert = true;
                this.message = err;
            })
        }
    }

    ngOnInit() {
    }

}
