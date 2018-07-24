import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ForgetComponent } from './forget.component';

const routes: Routes = [
    { path: '', component: ForgetComponent }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ForgetComponent
    ],
    exports: [
        ForgetComponent
    ],
    entryComponents: [
        ForgetComponent
    ]
})
export class ForgetModule { }
