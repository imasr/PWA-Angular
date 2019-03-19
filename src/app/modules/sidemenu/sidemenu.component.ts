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
  @Input() mobileView: any

  @Output() getUsers: EventEmitter<any> = new EventEmitter<any>()

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.mobileView = changes.mobileView.currentValue
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
