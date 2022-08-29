import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// typescript interfaces
import { HTTPResponseType, Gif } from '../interfaces/gifs.interfaces'; 

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient ) { 
    // load browser local storage for previous session if there is history saved
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || []; 
  }

  private _apiKey   : string = 'zxrklOEBNcGqq29RtbcceLlqIdVLZMAH';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private limit     : number = 10;

  public results    : Gif[] = []; 
  private _history  : string[] = [];// Store input search value that is declared as private to protect this array

  get history(){
    // break the reference to protect our data returning a new array with the first array's elements.
    return [...this._history];
  }

  searchGifts(searchQuery: string = '') {
    // convert any element to lowercase
    searchQuery = searchQuery.trim().toLocaleLowerCase();

    // previous check for empty strings
    if(searchQuery.trim().length === 0) return;

    // avoid duplicates
    if(!this._history.includes(searchQuery)){
      this._history.unshift(searchQuery);

      // Allow only the 10 first elements
      this._history = this._history.splice(0, 10);

      // saving history in browser's local storage
      localStorage.setItem('history', JSON.stringify(this._history ));
    } 
    // pure js request
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${searchQuery}&limit=${limit}`)
    // .then( res => {
    //   res.json().then(jsonData => {
    //     for(let element in jsonData.data){
    //       console.log(jsonData.data[element].url);
    //     }
    //   })
    // })

    // Angular Http parameters
    const  httpParams: HttpParams = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', searchQuery)
    .set('limit', this.limit)
    

    // Angular http request
    this.http
    .get<HTTPResponseType>(`${this.urlService}/search`, { params: httpParams })
    .subscribe(res =>{
      // console.log(res.data);
      this.results = res.data;
      // save in Local Storage results 
      localStorage.setItem('results', JSON.stringify( this.results ))
    });
  }
}
