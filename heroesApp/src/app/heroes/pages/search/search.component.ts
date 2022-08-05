 import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
    .card-container{
      width: 30%;
    }
  `]
})
export class SearchComponent implements OnInit {

  searchQuery     : string = '';
  heroSuggestions : Heroes[] = [];
  selectedHero    : Heroes | undefined;

  constructor( private heroService: HeroesService ) { }

  ngOnInit(): void {
  }

  search() {
    this.heroService.getSuggestions( this.searchQuery.trim() )
        .subscribe( heroes => this.heroSuggestions = heroes );
  }

  selectedOption( event: MatAutocompleteSelectedEvent  ) {

    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    // We specified value as a entire hero object so we need to access to the id
    const hero: Heroes = event.option.value;
    
    // update local search query parameter
    this.searchQuery = hero.superhero;
    
    // make a service's request to find hero info
    this.heroService.getHeroById( hero.id! )
        .subscribe( hero =>  this.selectedHero = hero);
    
  }
}
