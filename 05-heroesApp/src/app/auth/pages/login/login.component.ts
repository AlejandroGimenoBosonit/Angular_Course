import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( 
    private router      : Router, 
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    // Go to backend
    // get a user
    this.authService
        .login()
        .subscribe( () => {
          // go to heroes list - navigate
          this.router.navigate( ['/heroes'] )
        })
    
  }

}
