import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndPoint: string = environment.apiEndPoint;
  // without Angular Guards every time user refresh  the auth info it's deleted(in memory)
  private _auth      : Auth | undefined;

  constructor(private httpService: HttpClient) { }

  // use getter to access to user's info
  get auth(): Auth{
    return {...this._auth!};
  }

  authVerification(): Observable<boolean> {
    // Verify local storage token
    if(!localStorage.getItem('id')){
      // return observable of false
      return of(false);
    }
    return this
                .httpService
                .get<Auth>(`${this.apiEndPoint}/users/1`)
                .pipe(
                  // we use map to transform anything that it'scomming from the previous step
                  map(auth => {
                    this._auth = auth;  
                    return true;
                  })
                )
  }

  login() {
    return this
            .httpService
            .get<Auth>(`${this.apiEndPoint}/users/1`)
            // Used to perform side-effects for notifications 
            // from the source observable
            .pipe(
              // store user data locally
              tap( resp => this._auth = resp),
              // store user data in Local Storage
              tap( resp => localStorage.setItem( 'id', resp.id ))
            )
  }
}
