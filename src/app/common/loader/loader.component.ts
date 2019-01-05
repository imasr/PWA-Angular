import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @ViewChild('openModalButton') openModalButton: ElementRef;
    constructor() { }

    ngOnInit() {
        // this.openModalButton.nativeElement.click()
    }
    ngOnDestroy() {
        // document.getElementsByTagName('div')
    }

}
