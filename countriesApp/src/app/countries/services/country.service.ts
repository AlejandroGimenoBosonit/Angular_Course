import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/countries.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // API url
  private apiUrl: string = "https://restcountries.com/v2";

  // service injection
  constructor(private httpService: HttpClient) { }

  // methods
  searchCountries(term: string): Observable<Country[]>{
    // build query
    const urlQuery: string = `${this.apiUrl}/name/${term}`;

    // http request
    return this.httpService.get<Country[]>( urlQuery );
  }

  searchCapital(term: string): Observable<Country[]>{
    // build query
    const urlQuery: string = `${this.apiUrl}/capital/${term}`;

    // http request
    return this.httpService.get<Country[]>( urlQuery );
  }

  getCountryByCode( countryId: string ): Observable<Country>{
    // build query
    const urlQuery: string = `${this.apiUrl}/alpha/${ countryId }`;

    // http request
    return this.httpService.get<Country>( urlQuery );
  }
}
