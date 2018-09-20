import { Component, OnInit } from '@angular/core';
import { config } from './../../../config/config';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'contacts-app',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    contactList: any;
    showContacts = false;
    statusObj = config.statusObj;
    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.getContacts()
    }
    getContacts() {
        this.api.allUsers().subscribe(res => {
            this.contactList = res.result;
        });
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


}
