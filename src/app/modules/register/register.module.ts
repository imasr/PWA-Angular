import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from './register.component';
import { LoaderModule } from '../../common/loader/loader.module';
import { ModalModule } from '../../common/modal/modal.module';

const routes: Routes = [
    { path: '', component: RegisterComponent }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LoaderModule,
        ModalModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [
        RegisterComponent
    ],
    entryComponents: [
        RegisterComponent
    ]
})
export class RegisterModule { }
