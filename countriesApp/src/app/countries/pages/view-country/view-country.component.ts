import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styles: [
  ]
})
export class ViewCountryComponent implements OnInit {

  // we declare a country type varuable as null
  country!: Country;

  // To deal with url changes
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService  
  ) { }

  ngOnInit(): void {
    // // We want to subscribe to any change in the url
    // this.activatedRoute.params.subscribe( ({ countryId }) => {
    //   console.log(countryId);

    //   this.countryService
    //   // call service search method
    //   .getCountryByCode( countryId )
    //   // subscribe to get the country info
    //   .subscribe( country => {
    //     console.log(country);
    //   } )
    // });

    // we can use switchMap instead

    // access to the observable's parameters
    this.activatedRoute.params
    // specify rxjs operators
    .pipe(
      /*
      switcMap recieves last observable (params) and return
      a new observable ( country data from service search method )
      and switch them to operate with the new one
      */
      switchMap( ({ countryId }) => this.countryService.searchCountryByCode( countryId ) ),
      // we take the switchMap result and tap will print by console
      tap(console.log)
      )
    // make subscription
    .subscribe( res => this.country = res)
  }

}
