import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { EventManager } from '@angular/platform-browser';
import { config } from './../../../config/config';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    menuList: any = [{ title: 'users', id: 1 }, { title: 'admin', id: 2 }];
    activeId = 1;
    users: any = [];
    usersView: any;
    overlay: any;
    mobileView: boolean;
    statusObj = config.statusObj;
    showChats: any;
    filterData: any;
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
        this.api.setStatusOnline().then(user => {
            this.getUsers();
        });
    }
    getUsers(event?) {
        this.api.allUsers().subscribe(res => {
            this.users = res.result;
        });
    }

    search() {
        this.api.search({ email: this.filterData }).subscribe(res => {
            this.users = res.result;
        });
    }

    image(data) {
        if (data && data.image_url && data.image_url.indexOf('http') != -1) {
            return data.image_url
        }
        if (data && data.image) {
            return environment.baseUrl + '/' + data.image;
        }
        return 'assets/user.png';
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
        let icon;
        this.statusObj.map((value, key) => {
            if (value.title == title) {
                icon = value.icon;
            }
        });
        return icon;
    }
    openChatRoom(event) {
        this.showChats = event
        console.log(this.showChats);
    }
    closeRoom(event) {
        this.showChats = ""
    }
}
