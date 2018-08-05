import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: SettingsComponent }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]

})
export class SettingsModule { }
