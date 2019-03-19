import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  menuList: any = [{ title: 'Add New User', id: 1 }, { title: 'Deactivated User', id: 2 }];

  constructor() { }

  ngOnInit() {
  }

}
