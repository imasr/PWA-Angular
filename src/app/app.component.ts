import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as firebase from 'firebase';
import { PushService } from "./push.service";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messaging: any;
  token: any;
  itemsArr: any = []
  items: AngularFireList<any>
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
    private db: AngularFireDatabase,
    private pushService: PushService
  ) {
    this.messaging = firebase.messaging();

    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
        })
        .catch(err => {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    this.itemsArr = []  // Reinitialize the array to prevent data duplication
    this.db.list('items').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        )
      ).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log('>>>>>>>>>>>>>>>>>>>...', snapshot.key);
          this.itemsArr.push(snapshot.key);
        });
      });

  }

  checkToken(token, arr) {
    let counter: number = 0
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === token) {
        counter++
      }
    }
    console.log("Counter value", counter)
    return counter
  }


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(this.activateRoute.snapshot.root)
        this.titleServive.setTitle(title)
      }
    })

    // this.items = this.db.list('/items')
    this.messaging.requestPermission()
      .then((res) => {
        console.log('Notification permission granted.', res);
        this.messaging.getToken()
          .then(currentToken => {
            if (currentToken) {
              this.token = currentToken
              this.pushData.to = this.token
              console.log(this.pushData.to)
              // Set a timeout so as to enable all the data to be loaded
              setTimeout(() => {
                if (this.checkToken(this.token, this.itemsArr) === 0) {
                  console.log("Push occurrence")
                  this.items.push({ tokenID: currentToken })
                } else {
                  console.log("User is already subscribed")
                }
              }, 6500)
              // Displays the current token data
              console.log("currentToken: ", currentToken);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token.', err);
          });
      })
      .catch((err) => {
        console.log('Unable to get permission to notify. ', err);
      })

    this.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
    });
  }

  generatePush() {
    if (this.pushData.to === "") {
      console.log("No token available");
      return;
    }
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