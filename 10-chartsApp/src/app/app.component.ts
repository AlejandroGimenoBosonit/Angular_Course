import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lienarSelector: boolean = false;
  doubleSelector: boolean = false;
  doughnutSelector: boolean = false;

  constructor( private primeNGConfig: PrimeNGConfig ) { }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
    console.log(this.lienarSelector, this.doubleSelector, this.doughnutSelector);
    
  }

  changeStatus(selector: string) {
    switch(selector){
      case 'lienarSelector':
        this.lienarSelector = !this.lienarSelector;
        break;
      case 'doubleSelector':
        this.doubleSelector = !this.doubleSelector;
        break;
      case 'doughnutSelector':
        this.doughnutSelector = !this.doughnutSelector;
        break;
    }
  }
}
