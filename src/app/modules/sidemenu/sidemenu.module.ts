import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';



@NgModule({
  declarations: [SidemenuComponent],
  imports: [
    CommonModule,
  ],
  exports: [SidemenuComponent]

})
export class SidemenuModule { }
