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
    errAlert: boolean = false;
    successAlert: boolean = false;
    errorMessage: String;
    message: any;
    paramsKey: String;
    loader: boolean = false;
    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    reset(form: NgForm) {
        this.errAlert = false;
        if (form.value.password == form.value.confirmPassword) {
            this.loader = true;
            let body = {
                newPassword: form.value.confirmPassword,
                key: this.paramsKey
            }
            this.api.authApi(body, 'reset').subscribe(res => {
                this.loader = false;
                this.successAlert = true;
                this.message = res.message;
                form.resetForm()
            }, err => {
                this.loader = false;
                this.errAlert = true;
                this.message = err.error.error;
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
