import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ContactsComponent],
    exports: [ContactsComponent]
})
export class ContactsModule { }
