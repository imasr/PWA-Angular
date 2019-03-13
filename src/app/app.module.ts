import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { IntercepterHttp } from './services/http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { firebaseConfig } from '../environments/firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { VersionCheckService } from './services/version-check.service';

firebase.initializeApp(firebaseConfig);
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: IntercepterHttp,
            multi: true
        },
        VersionCheckService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
