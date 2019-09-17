import { Component, NgZone } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    alert: boolean = false;
    message: any;
    loader: boolean = false;

    constructor(
        private api: ApiService,
        private storageService: LocalStorageService,
        private router: Router,
        private zone: NgZone
    ) { }

    register(form: NgForm) {
        this.loader = true;
        this.alert = false;
        if (form.value) {
            this.api.authApi(form.value, 'register').subscribe(res => {
                this.loader = false;
                this.message = {
                    message: `${res.message}. You will be redirected to dashboard`
                };
                this.alert = true;
                setTimeout(() => {
                    this.alert = false;
                    if (res.result.token) {
                        this.zone.run(() => {
                            this.storageService.setLocalStorage('accessToken', res.result.token)
                            this.storageService.setLocalStorage('login', res.status)
                            this.storageService.setLocalStorage('result', JSON.stringify(res.result));
                            this.router.navigate(['/dashboard']);
                        })
                    }
                }, 3000)
            }, err => {
                this.loader = false;
                this.alert = true;
                this.message = err;
            })
        }
    }

}
