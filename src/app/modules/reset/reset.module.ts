import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: ResetComponent }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ResetComponent
    ],
    exports: [
        ResetComponent
    ],
    entryComponents: [
        ResetComponent
    ]
})
export class ResetModule { }
