import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { ContactsModule } from '../contacts/contacts.module';
import { ChatModule } from '../chat/chat.module';
import { SidemenuModule } from '../sidemenu/sidemenu.module';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavbarModule,
        ContactsModule,
        ChatModule,
        SidemenuModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule { }
