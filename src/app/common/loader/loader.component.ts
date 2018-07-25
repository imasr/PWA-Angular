import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { $ } from '../../../../node_modules/protractor';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
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
