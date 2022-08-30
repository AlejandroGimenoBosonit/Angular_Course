import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate, CanLoad {

  // service injection to apply verifyToken method
  constructor( 
    private auth  : AuthService,
    private router: Router 
  ){}
  
  canActivate(): Observable<boolean> | boolean {
    // console.log('canActivate');
    return this 
            .auth
            .verifyToken()
            .pipe(
              tap( valid => {
                // if verify token returns false = auth error, redirecto to login
                if(!valid) this.router.navigateByUrl('/auth')
              })
            );
  }
  canLoad(): Observable<boolean> | boolean {
    // console.log('canLoad');
    return this 
            .auth
            .verifyToken()
            .pipe(
              tap( valid => {
                // if verify token returns false = auth error, redirecto to login
                if(!valid) this.router.navigateByUrl('/auth')
              })
            );
  }
}
