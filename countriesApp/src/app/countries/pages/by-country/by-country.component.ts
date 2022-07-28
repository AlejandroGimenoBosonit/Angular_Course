import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
  ]
})
export class ByCountryComponent implements OnInit {

  term     : string = "";
  isError  : boolean = false;
  countries: Country[] = [];

  // service injection
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  searchCountry( emitedTerm: string ){
    this.isError = false;

    // update local term with emited term
    this.term = emitedTerm;

    // calling service's search method
    this.countryService
    .searchCountries(this.term)
    // We use subscribe because we're using in service an Observable and they need to be switched by subscribe
    .subscribe({
      next: countries => {
        this.countries = countries
        console.log(this.countries);
        
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
    this.isError = false;
    // TODO: create suggestions
    console.log(emitedTerm);
    
  }
}
