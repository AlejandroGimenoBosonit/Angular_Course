import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  
  constructor( 
    private router      : Router,
    private authService : AuthService
  ) { }

  get auth(){
    return this.authService.auth;
  }

  ngOnInit(): void {
  }

  logout() {
    // Go to backend
    // get a user

    // go to heroes list - navigate
    this.router.navigate( ['/auth'] )
  }
}
