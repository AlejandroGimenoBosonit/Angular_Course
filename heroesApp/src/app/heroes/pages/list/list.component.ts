import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  heroes: Heroes[] = [];

  // service injection
  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
    // get heroes when component inits
    this.heroesService.getHeroes().subscribe( res => (this.heroes = res));
  }

}
