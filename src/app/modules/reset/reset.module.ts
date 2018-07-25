import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from '../../common/loader/loader.module';
import { ModalModule } from '../../common/modal/modal.module';

const routes: Routes = [
    { path: '', component: ResetComponent }
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
