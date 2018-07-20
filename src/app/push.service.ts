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
  pushData: any = {
    'notification': {
      "title": "Background Message Title",
      "body": "Background Message Body"
    },
    "to": ""
  }
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        console.log(this.messaging.getToken())
        return this.messaging.getToken()
      })
      .then(token => {
        console.log('tokennnnnnnnnnn', token)
        this.pushData.to = token
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
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
