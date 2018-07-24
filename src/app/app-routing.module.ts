import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', loadChildren: 'src/app/modules/register/register.module#RegisterModule', data: { title: 'Registration' } },
    { path: 'login', loadChildren: 'src/app/modules/login/login.module#LoginModule', data: { title: 'Login' } },
    { path: 'forget', loadChildren: 'src/app/modules/forget/forget.module#ForgetModule', data: { title: 'Forget Password' } },
    { path: 'reset/:id', loadChildren: 'src/app/modules/reset/reset.module#ResetModule', data: { title: 'Reset Password' } },
    { path: 'dashboard', canActivate: [AuthGuardService], loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule', data: { title: 'Welcome to Dashboard' } },
    { path: 'camera', loadChildren: 'src/app/modules/camera-open-page/cmx-camera-open-page.module#CmxCameraOpenPageModule', data: { title: 'camera' } },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
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
