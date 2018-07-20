import { Injectable } from '@angular/core';
import { take, map, catchError } from "rxjs/operators";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PushService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
  showtoken = new BehaviorSubject(null)
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
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log('tokennnnnnnnnnn', token)
        this.pushData.to = token
        this.showtoken.next(token)
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
