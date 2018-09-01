import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { config } from './../../../config/config';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  contactList: any;
    showContacts=false;
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
