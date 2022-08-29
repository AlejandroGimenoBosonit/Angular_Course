import { Component, OnInit } from '@angular/core';
// primeng types
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  // menuBar items
  menuBarItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    //Load at the first component load
    this.menuBarItems = [
      {
        label: 'Angular Pipes',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Texts & Dates',
            icon: 'pi pi-align-left',
            // Usinf RouterLink to go to the correct component
            routerLink: '/'
          },
          {
            label: 'Numbers',
            icon: 'pi pi-dollar',
            // Usinf RouterLink to go to the correct component
            routerLink: 'numbers'
          },
          {
            label: 'Not Common',
            icon: 'pi pi-globe',
            // Usinf RouterLink to go to the correct component
            routerLink: 'not-common'
          }
        ]
      },
      {
        label: 'Custom Pipes',
        icon: 'pi pi-cog',
        routerLink: 'sort'
      }
    ];
  }


}
