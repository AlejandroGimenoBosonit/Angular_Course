import { Component, OnInit } from '@angular/core';

// typescript interface
import { Character } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: []
})
export class MainPageComponent implements OnInit {

  ngOnInit(): void {
  }

  // default component value
  defaultChar: Character = {
    name: 'Mr. Satan',
    power: 10
  }

  // constructor to crate a service instance
  constructor(private dbzService: DbzService){ }// dependence insjection
}
