import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interfaces';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent implements OnInit {
  
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
    .searchCapital(this.term)
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
}
