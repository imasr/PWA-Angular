import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  sideData: any = [{ title: 'users', id: 1 }]
  activeId = 1;
  users: any = []
  usersView: any;
  overlay: any

  constructor(
    private api: ApiService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.commonService.dashboard(true);
    this.getUsers()
    this.commonService.overlayBodyBackground().subscribe(res => {
      console.log(res);

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
      this.users = res
    })
  }

  image(email) {
    var patt = new RegExp("gmail");
    var res = patt.exec(email)
    if (res) {
      return image_url + '/' + email;
    } else {
      return false
    }
  };

  delete(id) {
    this.api.deleteUser({ "id": id }).subscribe(res => {
      console.log(res);
      this.getUsers();
    }, err => {
      console.log(err);
    })
  }

  getusebyid(data) {
    this.usersView = data;
  }

}
