import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient) { }

  generatePush(pushData) {

    return this.http.post('https://fcm.googleapis.com/fcm/send', pushData)
      .pipe(
        map(data => {
          console.log("Successfully Sent")
        })
      );
  }
}