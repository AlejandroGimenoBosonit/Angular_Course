import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-card-hero-component',
  templateUrl: './card-hero-component.component.html',
  styles: [`
     mat-card{
      margin-top: 20px;
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
