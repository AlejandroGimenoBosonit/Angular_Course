import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersComponent } from './pages/numbers/numbers.component';
import { NotCommonComponent } from './pages/not-common/not-common.component';
import { BasicsComponent } from './pages/basics/basics.component';
import { SortComponent } from './pages/sort/sort.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

// custom Pipe
import { UppercasePipe } from './pages/pipes/uppercase.pipe';
import { FlyPipe } from './pages/pipes/fly.pipe';
import { SortPipe } from './pages/pipes/sort.pipe';



@NgModule({
  declarations: [
    NumbersComponent,
    NotCommonComponent,
    BasicsComponent,
    SortComponent,
    UppercasePipe,
    FlyPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    NumbersComponent,
    NotCommonComponent,
    BasicsComponent,
    SortComponent
  ]
})
export class SalesModule { }
