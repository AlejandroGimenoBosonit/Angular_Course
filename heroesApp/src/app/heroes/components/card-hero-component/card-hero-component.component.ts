import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-card-hero-component',
  templateUrl: './card-hero-component.component.html',
  styles: [`
     mat-card{
      margin-top: 20px;
      box-shadow: rgba(0, 0, 0, 0.24) 3px 5px 10px;
    }
    
  `]
})
export class CardHeroComponentComponent implements OnInit {

  // Input to recieve heroes from a parent component
  @Input() receivedHero!: Heroes;

  constructor() { }

  ngOnInit(): void {
  }

}
