import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from '../../../node_modules/rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    dashboardStatus: Subject<any>;
    overlayBody: Subject<any>;
    sidemenu: Subject<any>;
    loader: Subject<any>;

    constructor(
    ) {
        this.dashboardStatus = new Subject();
        this.overlayBody = new Subject();
        this.sidemenu = new Subject();
        this.loader = new Subject();
    }

    dashboard(boolean) {
        this.dashboardStatus.next(boolean);
    }
    dashboardStatusChange() {
        return this.dashboardStatus.asObservable();
    }
    overlay(boolean) {
        this.overlayBody.next(boolean);
    }
    overlayBodyBackground() {
        return this.overlayBody.asObservable();
    }
    sidemenuSetStaus() {
        this.sidemenu.next();
    }
    sidemenuGetStatus() {
        return this.sidemenu.asObservable();
    }
    loadingGet() {
        return this.loader.asObservable();
    }
    loadingSet(boolean) {
        this.loader.next(boolean);
    }

}
