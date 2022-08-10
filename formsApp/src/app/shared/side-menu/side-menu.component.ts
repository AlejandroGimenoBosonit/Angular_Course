import { Component, OnInit } from '@angular/core';

interface MenuItem {
  text: string,
  route: string
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [`
    li { 
      cursor: pointer;
    }
  `]
})
export class SideMenuComponent implements OnInit {

  templateMenu: MenuItem[] = [
    {
      text: 'Basics',
      route:'/template/basics'
    },
    {
      text: 'Dynamics',
      route:'/template/dynamics'
    },
    {
      text: 'Switches',
      route:'/template/switches'
    }
  ];

  reactiveMenu: MenuItem[] = [
    {
      text: 'Basics',
      route:'/reactive/basics'
    },
    {
      text: 'Dynamics',
      route:'/reactive/dynamics'
    },
    {
      text: 'Switches',
      route:'/reactive/switches'
    }
  ];

  authMenu    : MenuItem[] = [
    {
      text: 'Login',
      route: '/auth/login'
    },
    {
      text: 'Register',
      route: '/auth/register'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
