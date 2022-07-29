import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // getter to use httParams
  get httParams(){
    // http parameters to optimize
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flag,population');
  }

  // methods
  searchCountries(term: string): Observable<Country[]>{
    // build query
    const urlQuery: string = `${this.apiUrl}/name/${term}`;

    // http request
    return this.httpService.get<Country[]>( urlQuery, {params: this.httParams});
  }

  searchCapital(term: string): Observable<Country[]>{
    // build query
    const urlQuery: string = `${this.apiUrl}/capital/${term}`;

    // http request
    return this.httpService.get<Country[]>( urlQuery, { params:this.httParams } );
  }

  searchCountryByCode( countryId: string ): Observable<Country>{
    // build query
    const urlQuery: string = `${this.apiUrl}/alpha/${ countryId }`;

    // http request
    return this.httpService.get<Country>( urlQuery );
  }

  searchCountryByRegion( countryCode: string ): Observable<Country[]>{
    // build query
    const urlQuery: string = `${this.apiUrl}/regionalbloc/${ countryCode }`;

    // http request
    return this.httpService.get<Country[]>( urlQuery, { params:this.httParams } );
  }
}
