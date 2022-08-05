import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';

// routes array
const routes: Routes = [
  // http://localhost:4200/auth/register
  // http://localhost:4200/auth/login
  {
    path: 'auth',
    loadChildren: () => import( '../auth/auth.module' ).then( module => module.AuthModule )
  },
  
  {
    path: 'heroes',
    loadChildren: () => import('../heroes/heroes.module').then( module => module.HeroesModule ),
    // we want user could access ONLY if he/she is authenticated - protect with guard
    canLoad: [ AuthGuard ],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
