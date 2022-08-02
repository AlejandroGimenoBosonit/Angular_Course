import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styles: [
  ]
})
export class NumbersComponent implements OnInit {

  netSales: number = 25445643556.77467;
  percentage : number = 0.4856;

  constructor() { }

  ngOnInit(): void {
  }

}
