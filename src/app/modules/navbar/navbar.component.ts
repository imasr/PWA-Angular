import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { PushMessagingService } from '../../services/firebase.push-messaging.service';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    home = true;
    message: any;
    showtoken: any;
    loader = true;
    user: any;
    status = { title: '', icon: '' };
    sideNav = false;
    menuData = [
        { title: 'settings', icon: 'fa-cog' },
        { title: 'notification', icon: 'fa-bell' },
        { title: 'about', icon: 'fa-info-circle', },
        { title: 'logout', icon: 'fa-unlock-alt' }
    ];
    statusObj = [
        { id: 1, title: 'Online', icon: 'text-success' },
        { id: 2, title: 'Do Not Disturb', icon: 'text-danger' },
        { id: 3, title: 'Away', icon: 'text-warning' },
        { id: 4, title: 'Invisible', icon: 'text-muted' }
    ];
    profileImage: any;
    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private pushMessaging: PushMessagingService,
        private apiService: ApiService,
        private commonService: CommonService,
    ) {
        this.pushMessaging.pushNotification().subscribe(res => {
            this.message = res;
        });
        this.commonService.loadingGet().subscribe(res => {
            this.loader = res;
        });
    }
    ngOnInit() {
        this.commonService.dashboardStatusChange().subscribe(res => {
            if (res) {
                this.home = false;
                this.getUsers();
            } else {
                this.home = true;
            }
        });
    }
    getUsers() {
        const userid = JSON.parse(localStorage.getItem('result'))._id;
        this.apiService.getUserById(userid).subscribe(user => {
            this.user = user.result;
            this.status.title = this.user.userStatus.onlineStatus;
            _.forEach(this.statusObj, (value, key) => {
                if (value.title === this.user.userStatus.onlineStatus) {
                    this.status.icon = value.icon;
                }
            });
        });
    }
    image(data) {
        if (data) {
            return `${environment.baseUrl}/${data}`;
        } else {
            return 'assets/user.png';
        }
    }
    generatePush() {
        this.pushMessaging.generatePush()
            .subscribe(data => {
                console.log('Succesfully Posted');
            }, (err) => {
                console.log(err);
            });
    }
    logout() {
        this.sideNav = false;
        this.apiService.setStatusDestroy().then(res => {
            this.localStorage.clearLocalStorage();
            this.router.navigate(['/login']);
        });
    }
    closeNav() {
        this.sideNav = !this.sideNav;
        this.commonService.overlay(this.sideNav);
    }
    clickMenu(title) {
        this.closeNav();
        if (title === 'logout') {
            this.logout();
        } else {
            this.router.navigate([title]);
        }
    }
    sidemenuCloseOpen() {
        this.commonService.sidemenuSetStaus();
    }
    setStatus(status) {
        this.status.title = status.title;
        this.status.icon = status.icon;
        this.apiService.setUserStatus(`presence=yes&onlineStatus=${status.id}`).subscribe(user => {
            console.log(user.result);
        });
    }
    onFileChanged(event) {
        this.profileImage = event.target.files[0];
        const uploadData = new FormData();
        uploadData.append('image', this.profileImage, this.profileImage.name);
        this.apiService.uploadProfileImage(uploadData).subscribe(res => {
            this.getUsers();
        }, err => {
            console.log(err);
        });
    }

}
