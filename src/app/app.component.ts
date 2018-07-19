import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PushService } from "./push.service";
import * as firebase from 'firebase';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messaging: any
  token: any  // Stores the current token ID instance generated
  items: any;
  itemsDisplay: AngularFireList<any[]> // List observable for template view (Optional. items itself can be used)
  itemsArr: any[] // Stores the token IDs retrieved from the firebase database 
  hideToken: boolean = false

  // Notificayion object
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
    public db: AngularFireDatabase,
    private pushService: PushService
  ) {
    this.itemsDisplay = db.list('/items')

    // Declaring the property value of messaging
    this.messaging = firebase.messaging();

    // Check for token refresh
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // Obtaining the firebase data and retrieving token ID values separately
    this.itemsArr = []  // Reinitialize the array to prevent data duplication
    this.items = this.db.list('items').snapshotChanges().pipe(
      map(actions => actions)
    )
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.val().tokenID);
        this.itemsArr.push(snapshot.val().tokenID);
      });
    });
    // console.log(this.itemsArr)
  }

  // Check for duplicates in token subscription
  checkToken(token, arr) {
    console.log("Inside check token function")
    console.log(arr)
    console.log(token)
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

    this.items = this.db.list('/items')
    this.messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        this.messaging.getToken()
          .then(function (currentToken) {
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
              console.log("Stored token: ", this.token);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token.', err);
          });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify. ', err);
      })

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(function (payload) {
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