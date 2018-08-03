import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
    alert: boolean = false;
    message: any;
    paramsKey: String;
    loader: boolean = false;
    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    reset(form: NgForm) {
        this.alert = false;
        if (form.value.password == form.value.confirmPassword) {
            this.loader = true;
            let body = {
                newPassword: form.value.confirmPassword,
                key: this.paramsKey
            }
            this.api.authApi(body, 'reset').subscribe(res => {
                res.redirect = true
                this.loader = false;
                this.alert = true;
                this.message = res;
                form.resetForm()
            }, err => {
                this.loader = false;
                this.alert = true;
                this.message = err;
            })
        } else {
            form.form.controls['confirmPassword'].setErrors({ 'incorrect': true });;
        }
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.paramsKey = params.get('id');
        })
    }

}
