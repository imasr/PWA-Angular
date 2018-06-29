import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  component: ForgetComponent  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetComponent]
})
export class ForgetModule { }
