import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  avengers: string[] = ['Spiderman', 'Hulk', 'Black Widow', 'Thor', 'Vision', 'Scarlet Witch'];
  deleteAvenger: string = '';


  // delete method
  deleteHeroes(){
    this.deleteAvenger = this.avengers.shift() || '';
  }
}
