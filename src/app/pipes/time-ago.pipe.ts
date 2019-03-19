import { Pipe, PipeTransform, NgZone, ChangeDetectorRef } from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'timeago',
    pure: false
})
export class TimeAgoPipe implements PipeTransform {
    newValue: any;

    constructor(
        private cdRef: ChangeDetectorRef,
        private ngZone: NgZone
    ) { }

    transform(value: any, args?: string) {
        value = new Date(value)
        if (value == null || !(value instanceof Date)) {
            return '';
        }
        if (this.newValue == undefined || this.newValue == '' || this.newValue == null) {
            this.newValue = moment(new Date(value)).fromNow()
        } else if (this.hasChanged(value)) {
            this.ngZone.runOutsideAngular(() => {
                this.ngZone.run(() => {
                    this.newValue = moment(new Date(value)).fromNow()
                    this.cdRef.detectChanges()
                });
            })
        }
        if (this.newValue === "a few seconds ago") {
            this.newValue = "just now"
        }
        return this.newValue
    }

    hasChanged(value) {
        let currentText = moment(new Date(value)).fromNow()
        if (currentText === "a few seconds ago") {
            currentText = "just now"
        }
        if (this.newValue !== currentText) {
            return true;
        } else {
            return false;
        }
    }
}
