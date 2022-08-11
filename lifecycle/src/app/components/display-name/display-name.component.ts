import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-name',
  templateUrl: './display-name.component.html',
  styles: [
  ]
})
export class DisplayNameComponent implements OnInit, OnChanges {

  @Input() name!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

}
