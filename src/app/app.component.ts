import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PushService } from "./push.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  message: any;
  pushData: any = {
    'notification': {
      "title": "Background Message Title",
      "body": "Background Message Body"
    },
    "to": ""
  }

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleServive: Title,
    private pushService: PushService
  ) {

  }

  ngOnInit() {
    this.pushService.getPermission()
    this.pushService.receiveMessage()
    this.message = this.pushService.currentMessage

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(this.activateRoute.snapshot.root)
        this.titleServive.setTitle(title)
      }
    })
  }

  generatePush() {
    this.pushService.generatePush(this.pushData)
      .subscribe(data => { console.log("Succesfully Posted") }, err => console.log(err));
  }

  private getTitle(routeSnapshot: ActivatedRouteSnapshot, title: string = '') {
    title = routeSnapshot.data && routeSnapshot.data['title'] ? routeSnapshot.data['title'] : title;
    if (routeSnapshot.firstChild) {
      title = this.getTitle(routeSnapshot.firstChild, title);
    }
    return title;
  }

}