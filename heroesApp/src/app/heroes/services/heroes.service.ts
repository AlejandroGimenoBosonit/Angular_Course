import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroes } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // environment variables
  private apiEndPoint: string = environment.apiEndPoint;

  constructor( private httpClient: HttpClient  ) { }

  // methods
  getHeroes(): Observable<Heroes[]> {
    return this.httpClient.get<Heroes[]>( `${this.apiEndPoint}/heroes` );
  }

  getHeroById(id: string): Observable<Heroes> {
    return this.httpClient.get<Heroes>(`${this.apiEndPoint}/heroes/${id}`)
  }

  getSuggestions(query: string): Observable<Heroes[]> {
    return this.httpClient.get<Heroes[]>(`${this.apiEndPoint}/heroes?q=${query}&_limit=6`)
  }
}
