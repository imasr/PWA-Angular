import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { ModalModule } from '../../common/modal/modal.module';
import { LoaderModule } from '../../common/loader/loader.module';

const routes: Routes = [
    { path: '', component: LoginComponent }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ModalModule,
        LoaderModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    entryComponents: [
        LoginComponent
    ]
})
export class LoginModule { }
