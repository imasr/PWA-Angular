import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from './register.component';

const routes: Routes = [
    { path: '', component: RegisterComponent }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
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
