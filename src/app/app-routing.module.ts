import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: 'src/app/modules/register/register.module#RegisterModule', data: { title: 'Registration' } },
  { path: 'login', loadChildren: 'src/app/modules/login/login.module#LoginModule', data: { title: 'Login' } },
  { path: 'forget', loadChildren: 'src/app/modules/forget/forget.module#ForgetModule', data: { title: 'Forget' } },
  { path: 'dashboard', loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule', data: { title: 'Welcome to Dashboard' } },
  // { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }