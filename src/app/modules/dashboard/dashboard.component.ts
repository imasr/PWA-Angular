import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { image_url } from './../../../config/config';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any;
  activeId = ""
  image_url = image_url;
  users: any = []
  usersView: any;
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {

    this.items = ["users", "22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"]
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
