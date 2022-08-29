import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomIfDirective } from './directives/custom-if.directive';
import { ErrorMsgDirective } from './directives/error-msg.directive';



@NgModule({
  declarations: [
    CustomIfDirective,
    ErrorMsgDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgDirective,
    CustomIfDirective
  ]
})
export class SharedModule { }
