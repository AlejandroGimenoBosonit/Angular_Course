import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements OnInit {

  constructor() { }

  @Input()  inputCountries: Country[] = [];

  ngOnInit(): void {
  }

}
