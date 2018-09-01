import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        NavbarComponent,
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }
