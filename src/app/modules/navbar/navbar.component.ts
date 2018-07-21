import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { PushService } from '../../push.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  home: boolean = true;
  message: any;
  showtoken: any;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private pushService: PushService,
    private commonService: CommonService
  ) {
    this.message = this.pushService.currentMessage
  }

  ngOnInit() {
    this.commonService.dashboardStatus$.subscribe(res => {
      if (res) {
        this.home = false
      }
      else {
        this.home = true
      }
    })
    this.showtoken = this.pushService.showtoken
  }

  generatePush() {
    this.pushService.generatePush()
      .subscribe(data => {
        console.log("Succesfully Posted")
      }, err =>
          console.log(err)
      );
  }

  logout() {
    this.localStorage.clearLocalStorage();
    this.router.navigate(['/login'])
  }

}
