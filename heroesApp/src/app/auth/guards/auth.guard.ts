import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  // AuthService injection
  constructor( 
    private authService : AuthService, 
    private router      : Router  
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return (this.authService.auth.id) ? true : false;
    
    
    // if(this.authService.auth.id){
    //   return true
    // }
    // console.log("Blocked by AuthGuard - canActivate");
    // return false;
 
    
    return this
              .authService
              .authVerification()
              .pipe(tap( isAuthenticated => {
                if(!isAuthenticated){
                  this.router.navigate( ['/auth/login'] )
                }
              } ));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // check to user is returned
    // return (this.authService.auth.id) ? true : false;
    
    
    // if(this.authService.auth.id){
    //   return true
    // }
    // console.log("Blocked by AuthGuard - canLoad");
    // return false;

    return this
              .authService
              .authVerification()
              .pipe(tap( isAuthenticated => {
                if(!isAuthenticated){
                  this.router.navigate( ['/auth/login'] )
                }
              } )); 
  }
}
