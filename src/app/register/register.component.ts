import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errAlert:boolean= false;
  successAlert:boolean=false;
  errorMessage: String;
  message: any;
  constructor(private api: ApiService){
  }

  register(form:NgForm){
    this.errAlert=false;
    if(form.value){
      this.api.loginApi(form.value, 'register').subscribe(res=>{
        this.message=res.success;
        this.successAlert=true;  
        setTimeout(()=>{
          this.successAlert=false;  
        }, 5000)
      },err=>{
        this.message=err.error.message;
        this.errAlert=true;                        
      })
    }
  }

  ngOnInit() {
  }

}
