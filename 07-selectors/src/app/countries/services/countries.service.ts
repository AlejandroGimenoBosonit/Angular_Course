import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { CountryByAlphaCode, CountryByAlphaCodeSmall, CountryByCode_Name } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  // regions
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  // countries endpoint
  private _apiEndpoint: string = 'https://restcountries.com/v2';

  // get regions for protection
  get regions(): string[] {
    return [...this._regions];
  }

  get httpParams(){
    return new HttpParams().set('fields', 'alpha3Code,name');
  }

  constructor( private http: HttpClient ) { }

  //  methods
  getCountriesByRegion( region: string ): Observable<CountryByCode_Name[]> {

    const urlQuery: string = `${this._apiEndpoint}/region/${region}`;
    return this.http.get<CountryByCode_Name[]>(urlQuery, { params: this.httpParams})
  }

  getCountryBtAlpha3Code( code: string ): Observable<CountryByAlphaCode | null> {

    if( !code ) return of(null);

    const urlQuery: string = `${this._apiEndpoint}/alpha/${code}`;
    return this.http.get<CountryByAlphaCode>(urlQuery)
  }

  getCountryBtAlpha3CodeSmall( code: string ): Observable<CountryByAlphaCodeSmall> {

    const urlQuery: string = `${this._apiEndpoint}/alpha/${code}`;
    return this.http.get<CountryByAlphaCodeSmall>(urlQuery, { params: this.httpParams})
  }
  
  getCountryBorders( borders: string[] ): Observable<CountryByAlphaCodeSmall[]> {

    if(!borders) return of([]);

    const requests: Observable<CountryByAlphaCodeSmall>[] = [];

    borders.forEach( code => {
      const request = this.getCountryBtAlpha3CodeSmall( code );
      requests.push(request); 
    });

    return combineLatest( requests );
  }
}
