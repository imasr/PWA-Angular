import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dashboardStatus = new Subject();
  dashboardStatus$ = this.dashboardStatus.asObservable();
  constructor() { }

  dashboard(boolean) {
    this.dashboardStatus.next(boolean)
  }
}
