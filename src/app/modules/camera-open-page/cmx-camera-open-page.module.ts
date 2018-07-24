import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';

import { CmxCameraOpenPageComponent } from './cmx-camera-open-page.component';

const routes: Routes = [
    { path: '', component: CmxCameraOpenPageComponent }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CmxCameraOpenPageComponent
    ],
    exports: [
        CmxCameraOpenPageComponent
    ],
    entryComponents: [
        CmxCameraOpenPageComponent
    ]
})
export class CmxCameraOpenPageModule { }
