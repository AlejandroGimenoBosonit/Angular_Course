import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Person {
  name: string;
  favorites: Favorite[]
}

interface Favorite {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  newGame: string ='';

  person: Person = {
    name: 'John Doe',
    favorites: [
      {id: 1, name: 'Metal Gear'},
      {id: 2, name: 'Bioshock'}
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log('Dynamic'); 
  }

  validName(): boolean {
    return this.myForm?.controls['personName']?.errors! && this.myForm?.controls['productName']?.touched;
  }

  takeInfo() {
    this.myForm.resetForm({
      personName: ''
    });
  }

  delete( index: number ) {
    this.person.favorites.splice( index, 1 );
  }

  addGame() {
    const newFav: Favorite = {
      id: this.person.favorites.length+1,
      name: this.newGame
    }

    this.person.favorites.push( {...newFav} );
    this.newGame='';
  }

}
