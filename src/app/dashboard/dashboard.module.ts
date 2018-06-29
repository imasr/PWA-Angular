import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '',  component: DashboardComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent
  ]
})
export class DashboardModule { }
