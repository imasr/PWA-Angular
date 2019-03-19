import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { SidemenuModule } from '../sidemenu/sidemenu.module';

const routes: Routes = [
    {
        path: '', component: SettingsComponent, children: [
            { path: '', redirectTo: 'newuser' },
            { path: 'newuser', loadChildren: 'src/app/modules/register/register.module#RegisterModule' }
        ]
    },
];
@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule,
        SidemenuModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]

})
export class SettingsModule { }
