import { Component, OnInit } from '@angular/core';
import { Color, Hero } from '../../interfaces/sales.interfaces';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styles: [
  ]
})
export class SortComponent implements OnInit {

  isUpper :boolean = false;
  sortBy: string = '';
  heroes  :Hero[] = [
    {
      name: 'Superman',
      fly: true,
      color: Color.blue
    },
    {
      name: 'Batman',
      fly: false,
      color: Color.black
    },
    {
      name: 'Robin',
      fly: false,
      color: Color.green
    },
    {
      name: 'Daredevil',
      fly: false,
      color: Color.red
    },
    {
      name: 'Green Lantern',
      fly: true,
      color: Color.green
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleText() {
    this.isUpper = !this.isUpper;
   }

   changeSorting(value: string ) {
    this.sortBy = value;
    console.log(value);
    
   }
}
