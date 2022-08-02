import { Component, OnInit } from '@angular/core';
// PrimeNg ripple effect config
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // PrimeNg config insertion
  constructor( private primengConfig: PrimeNGConfig ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
