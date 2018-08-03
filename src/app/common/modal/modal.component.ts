import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @ViewChild('openModalButton') openModal: ElementRef;
    @Input() message;

    constructor(private router: Router) {
    }
    ngOnInit() {
        this.openModal.nativeElement.click()
    }
    close(message) {
        if (message.redirect) {
            this.router.navigate(['login']);
        }
    }
}
