import { NgModule } from '@angular/core';
//Usually we are going to work with ngFor, ngIf , etc
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Components
import { MainPageComponent } from './main-page/main-page.component';
import { CharactersComponent } from './characters/characters.component';
import { AddCharacterComponent } from './add-character/add-character.component';

// Services
import { DbzService } from './services/dbz.service';




@NgModule({
  declarations: [
    MainPageComponent,
    CharactersComponent,
    AddCharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    MainPageComponent,
    FormsModule
  ],
  providers:[
    DbzService
  ]
})
export class DbzModule { }
