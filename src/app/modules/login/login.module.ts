import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '',  component: LoginComponent  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ],
  entryComponents:[
    LoginComponent
  ]
})
export class LoginModule { }
