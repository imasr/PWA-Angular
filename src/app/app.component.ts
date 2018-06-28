import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  colornew='green';
  @ViewChildren(LoginComponent) loginInstance:QueryList<LoginComponent>;
  ngAfterViewInit(){
    console.log(this.loginInstance)
  }
  changeColor(){
    
  }
}