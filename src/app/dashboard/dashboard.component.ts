import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any = ["11111", "22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"]
  activeId = ""
  constructor() { }

  ngOnInit() {
  }

  active(id) {
    this.activeId = id
  }

}
