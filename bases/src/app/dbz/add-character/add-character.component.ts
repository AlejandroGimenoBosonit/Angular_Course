import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// typescript interface
import { Character } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: []
})
export class AddCharacterComponent implements OnInit {

  

  ngOnInit(): void {
  }

  // We want to associate childCharacter with the parent module's characters
  // @Input() childCharacters: Character[] = [];

   //object to deal with form information
   @Input() childDefaultCharacter: Character = {
    name: '',
    power: 0
  }

  // emit event to send character info
  // @Output() outNewChar: EventEmitter<Character>  = new EventEmitter<Character>();

  //service injections
  constructor(private dbzService:DbzService) {}
  
  addCharacter(){
    // To avoid Angular to refresh every time we press the button
    // event.preventDefault();

    if(this.childDefaultCharacter.name.trim().length === 0) return; 
    // console.log(this.childDefaultCharacter);
    // this.outNewChar.emit(this.childDefaultCharacter);
    
    // calling service method
    this.dbzService.addCharacter(this.childDefaultCharacter);

    // refresh input value
    this.childDefaultCharacter = {name: '', power:0};
    
  }
}
