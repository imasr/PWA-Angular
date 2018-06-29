import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login',  pathMatch: 'full'},
    { path: 'register', loadChildren: 'src/app/register/register.module#RegisterModule', data: { title: 'Registration' } },
    { path: 'login', loadChildren: 'src/app/login/login.module#LoginModule', data: { title: 'Login' } },
    { path: 'forget', loadChildren: 'src/app/forget/forget.module#ForgetModule', data: { title: 'Forget' } },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
