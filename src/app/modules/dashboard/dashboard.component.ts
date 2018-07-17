import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  sideData: any = [{ title: 'users', id: 1 }]
  activeId = ""
  image_url = image_url;
  users: any = []
  usersView: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getUsers()
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
