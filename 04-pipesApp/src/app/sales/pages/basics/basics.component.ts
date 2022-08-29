import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
}) 
export class BasicsComponent implements OnInit {

  exampleText : string = 'tHis A dIrty eXamPLE';

  date: Date = new Date(); // Today


  constructor() { }

  ngOnInit(): void {
  }

}
