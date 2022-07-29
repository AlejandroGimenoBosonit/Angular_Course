import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class ByCountryComponent implements OnInit {

  term              : string = "";
  isError           : boolean = false;
  countries         : Country[] = [];
  suggestedCountries: Country[] = [];
  displaySuggestions: boolean = false;

  // service injection
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  searchCountry( emitedTerm: string ){
    console.log(emitedTerm);
    
    // update display suggestions
    this.displaySuggestions = false;

    this.isError = false;

    // update local term with emited term
    this.term = emitedTerm;

    // calling service's search method
    this.countryService
    .searchCountries(this.term)
    // We use subscribe because we're using in service an Observable and they need to be switched by subscribe
    .subscribe({
      next: countries => {
        this.countries = countries;
      },
      error: err => {
        this.isError = true;
        this.countries = [];
        console.error(err)
      },
      complete: () => console.log('complete')      
    });
  }

  makeSuggestions( emitedTerm: string ){
    // update display suggestions
    this.displaySuggestions = true;
    this.isError = false;

    // update term
    this.term = emitedTerm;

    // make http request
    this.countryService.searchCountries( emitedTerm )
    // get countries
    .subscribe({
      next: (countries) => {
      // update local suggestedCountries with 5 suggestions
      this.suggestedCountries = countries.splice(0, 5);
      },
      error: (err) => this.suggestedCountries = []
    });
  }

  searchSuggested( term: string ){
    console.log(term);
    
    this.searchCountry( term );
    // hide suggestions
    this.displaySuggestions = false;
  }
}
