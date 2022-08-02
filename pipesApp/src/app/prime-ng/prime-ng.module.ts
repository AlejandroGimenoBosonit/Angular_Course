import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNg modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    FieldsetModule,

    MenubarModule,
  ]
})
export class PrimeNgModule { }
