import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule  } from "@angular/forms";

import { AppComponent } from './app.component';
import { IntercepterHttp } from './http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterHttp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
