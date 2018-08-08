import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';
import { CommonService } from '../../services/common.service';
import { EventManager } from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    sideData: any = [{ title: 'users', id: 1 }, { title: 'admin', id: 2 }]
    activeId = 1;
    users: any = []
    usersView: any;
    overlay: any
    mobileView: boolean;
    profileImage: any;

    constructor(
        private api: ApiService,
        private commonService: CommonService,
        private eventManager: EventManager,
    ) {
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
    }

    private onResize(event: UIEvent) {
        this.mobileView = window.screen.width < 700
    }
    ngOnInit() {
        this.commonService.dashboard(true);
        this.getUsers()
        this.commonService.overlayBodyBackground().subscribe(res => {
            this.overlay = res
        })
    }
    ngOnDestroy() {
        this.commonService.dashboard(false);
    }
    active(item, id) {
        this.activeId = id
        if (item == 'users') {
            this.getUsers();
        }
    }
    getUsers() {
        this.api.allUsers().subscribe(res => {
            this.users = res.result
        })
    }
    image(email) {
        var pattern = new RegExp("gmail");
        var res = pattern.exec(email)
        if (res) {
            return image_url + '/' + email;
        } else {
            return false
        }
    };
    delete(id) {
        this.api.deleteUser({ "id": id, role: "Admin" }).subscribe(res => {
            console.log(res);
            this.getUsers();
        }, err => {
            console.log(err);
        })
    }
    getusebyid(data) {
        this.usersView = data;
    }
    onFileChanged(event) {
        this.profileImage = event.target.files[0]
    }

    onUpload() {
        const uploadData = new FormData();
        uploadData.append('image', this.profileImage, this.profileImage.name);
        console.log(uploadData);

        this.api.uploadProfileImage(uploadData).subscribe(res => {
            console.log(res);
            this.getUsers();
        }, err => {
            console.log(err);
        })
    }

}
