import { Pipe, PipeTransform, NgZone, ChangeDetectorRef } from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'timeago',
    pure: false
})
export class TimeAgoPipe implements PipeTransform {
    timeMessage: any;

    constructor(
        private cdRef: ChangeDetectorRef,
        private ngZone: NgZone
    ) { }

    transform(value: any, args?: string) {
        value = new Date(value)
        if (value == null || !(value instanceof Date)) {
            return '';
        }
        if (this.timeMessage == undefined || this.timeMessage == '' || this.timeMessage == null) {
            this.timeMessage = moment(new Date(value)).fromNow()
        } else if (this.hasChanged(value)) {
            this.ngZone.runOutsideAngular(() => {
                this.ngZone.run(() => {
                    this.timeMessage = moment(new Date(value)).fromNow()
                    this.cdRef.detectChanges()
                });
            })
        }
        if (this.timeMessage === "a few seconds ago") {
            this.timeMessage = "just now"
        }
        return this.timeMessage
    }

    hasChanged(value) {
        let currentText = moment(new Date(value)).fromNow()
        if (currentText === "a few seconds ago") {
            currentText = "just now"
        }
        if (this.timeMessage !== currentText) {
            return true;
        } else {
            return false;
        }
    }
}
