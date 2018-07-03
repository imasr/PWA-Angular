import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any = ["users", "22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"]
  activeId = ""
  users: any = []
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  active(item, id) {
    this.activeId = id
    this.api.allUsers(item).subscribe(res => {
      this.users = res
    })
  }

}
