import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    * {
      margin: 15px;
    }
  `]
})
export class DashboardComponent implements OnInit {

  // get user informacion from service and store in a local getter
  get user(){
    return this.auth.user;
  }

  constructor( 
    private router: Router,
    private auth  : AuthService 
  ) { }

  ngOnInit(): void {
  }

  // methods
  logout() {
    // redirect to a url route
    this.router.navigateByUrl('/auth');
    // clear local storage
    this.auth.logout();
  }

}
