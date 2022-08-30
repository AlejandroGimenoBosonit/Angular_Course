import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userLogin, AuthResponse, User, userRegister } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _endPoint : string = environment.backEndPoint;
  private _user!    : User; 

  get user() {
    return {...this._user};
  }

  constructor( private http: HttpClient ) { }

  // methods
  login( payload: userLogin) {

    const url: string = `${this._endPoint}/auth`;
    
    return this
            .http
            .post<AuthResponse>(url, payload)
            .pipe(
              //secondary event
              tap( ({ok, token}) => { 
                // console.log(token);
                
                if(ok){
                  // store token in Local Storage
                  localStorage.setItem('token', token!);
                }
              }),

              map( res => res.ok ), //ony want to send the response's parameter ok
              /* 
              In the error case we want to return an observable with the 
              boolean value: false
              We need to use 'of()' to return an observable to subscribe
              */ 
              catchError( err => of(err.error.msg) )  
            );
  }

  register(payload: userRegister) {
    const url: string = `${this._endPoint}/auth/register`;

    return this
            .http
            .post<AuthResponse>(url, payload)
            .pipe(
              tap(({ok, token}) => {
                if(ok) {
                  localStorage.setItem('token', token!);
                }
              }),
              map( res => res.ok ),
              catchError( err => of(err.error.msg) )
            )
  }


  verifyToken(): Observable<boolean> {
    const url = `${this._endPoint}/auth/renew`;
    // send stored token in header
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '' );
    return this
            .http
            .get<AuthResponse>(url, {headers})
            .pipe(
              map( res => {
                // make user info persistent
                localStorage.setItem('token', res.token!);
                this._user = { name: res.name!, uid: res.uid!, email: res.email! }
                return res.ok;
              }),
              catchError(err => of(false))
            );
  }


  logout() {
    // remove token from local storage
    localStorage.removeItem('token');
  }
}
