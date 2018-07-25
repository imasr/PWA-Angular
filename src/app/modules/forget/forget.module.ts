import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ForgetComponent } from './forget.component';
import { LoaderModule } from '../../common/loader/loader.module';
import { ModalModule } from '../../common/modal/modal.module';

const routes: Routes = [
    { path: '', component: ForgetComponent }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        LoaderModule,
        ModalModule,
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
