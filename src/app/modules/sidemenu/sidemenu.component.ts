import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'sidemenu-app',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input() menu: any;
  activeId = 1;

  @Output() getUsers: EventEmitter<any> = new EventEmitter<any>()

  constructor() {
  }

  ngOnInit() {
  }

  callAction(item, id) {
    this.activeId = id;
    if (item === 'users') {
      this.getUsers.emit(item)
    }
  }

}
