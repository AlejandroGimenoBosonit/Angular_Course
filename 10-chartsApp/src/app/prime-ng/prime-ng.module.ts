import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ChartModule} from 'primeng/chart';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    SelectButtonModule,
    CheckboxModule,
    ChartModule,
    RippleModule
  ]
})
export class PrimeNgModule { }
