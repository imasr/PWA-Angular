import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import * as firebase from 'firebase/app';
import "firebase/messaging";
import { throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PushMessagingService {

  messaging: any;
  currentMessage: Subject<any>;
  pushData: any = {
    "notification": {
      "title": "Hello Angular",
      "body": "Its Push Notification Body",
      "icon": "assets/logo.png",
      "click_action": "login"
    },
    "to": ""
  }
  pushNotice = [];

  constructor(
    private http: HttpClient,
  ) {
    this.messaging = firebase.messaging()
    this.currentMessage = new Subject()
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log('token', token)
        this.pushData.to = token
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.pushNotice.push(payload)
      this.currentMessage.next(this.pushNotice)
    });

  }
  pushNotification() {
    return this.currentMessage.asObservable()
  }

  generatePush() {

    return this.http.post('https://fcm.googleapis.com/fcm/send', this.pushData)
      .pipe(
        map(data => {
          console.log("Successfully Sent", data)
        }),
        catchError(err => {
          return throwError(err)
        })
      );
  }
}
