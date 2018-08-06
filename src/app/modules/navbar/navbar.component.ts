import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { PushMessagingService } from '../../services/pushMessaging.service';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    home: boolean = true;
    message: any;
    showtoken: any;
    loader: boolean = true
    user: any;
    sideNav: boolean = false;
    menuData = [
        { title: "setting", icon: 'fa-cog' },
        { title: "notification", icon: 'fa-bell' },
        { title: "about", icon: 'fa-info-circle', },
        { title: "logout", icon: 'fa-unlock-alt' }
    ]
    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private pushMessaging: PushMessagingService,
        private apiService: ApiService,
        private commonService: CommonService
    ) {
        this.pushMessaging.pushNotification().subscribe(res => {
            this.message = res
        })
        this.commonService.loadingGet().subscribe(res => {
            console.log(res);

            this.loader = res
        })
    }
    ngOnInit() {
        this.commonService.dashboardStatusChange().subscribe(res => {
            if (res) {
                this.home = false;
                let userid = JSON.parse(localStorage.getItem('result'))._id
                this.apiService.getUserById(userid).subscribe(user => {
                    this.user = user.result;
                })
            }
            else {
                this.home = true
            }
        })
    }
    image(email) {
        var patt = new RegExp("gmail");
        var res = patt.exec(email)
        if (res) {
            return image_url + '/' + email;
        } else {
            return 'assets/user.png'
        }
    };
    generatePush() {
        this.pushMessaging.generatePush()
            .subscribe(data => {
                console.log("Succesfully Posted")
            }, err =>
                    console.log(err)
            );
    }
    logout() {
        this.sideNav = false;
        this.localStorage.clearLocalStorage();
        this.router.navigate(['/login'])
    }
    closeNav() {
        this.sideNav = !this.sideNav
        this.commonService.overlay(this.sideNav)
    }
    clickMenu(title) {
        this.closeNav()
        if (title == 'logout') {
            this.logout()
        } else {
            this.router.navigate([title])
        }
    }
    sidemenuCloseOpen() {
        this.commonService.sidemenuSetStaus()
    }
}
