import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { EventManager } from '@angular/platform-browser';
import { config } from './../../../config/config';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    sideData: any = [{ title: 'users', id: 1 }, { title: 'admin', id: 2 }];
    activeId = 1;
    users: any = [];
    usersView: any;
    overlay: any;
    mobileView: boolean;
    statusObj = config.statusObj;
    constructor(
        private api: ApiService,
        private commonService: CommonService,
        private eventManager: EventManager,
    ) {
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
    }

    private onResize(event: UIEvent) {
        this.mobileView = window.screen.width < 700;
    }
    ngOnInit() {
        this.commonService.dashboard(true);
        this.commonService.overlayBodyBackground().subscribe(res => {
            this.overlay = res;
        });
        this.api.setUserStatus(`presence=yes`).subscribe(user => {
            this.getUsers();
        });
    }
    active(item, id) {
        this.activeId = id;
        if (item === 'users') {
            this.getUsers();
        }
    }
    getUsers() {
        this.api.allUsers().subscribe(res => {
            this.users = res.result;
        });
    }
    image(data) {
        if (data) {
            return environment.baseUrl + '/' + data;
        } {
            return 'assets/user.png';
        }
    }
    delete(id) {
        this.api.deleteUser({ 'id': id, role: 'Admin' }).subscribe(res => {
            console.log(res);
            this.getUsers();
        }, err => {
            console.log(err);
        });
    }
    getusebyid(data) {
        this.usersView = data;
    }
    imageStatus(title) {
        console.log(title);

        let icon;
        this.statusObj.map((value, key) => {
            if (value.title == title) {
                icon = value.icon;
            }
        });
        return icon;
    }
}
