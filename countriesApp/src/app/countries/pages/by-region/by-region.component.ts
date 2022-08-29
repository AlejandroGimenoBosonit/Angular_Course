import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [`
    button{
      margin-right: 5px;
    }
  `]
})
export class ByRegionComponent implements OnInit {

  regionCodes : string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  activeRegion: string = '';
  countries   :Country[] = [];

  constructor( private countryService: CountryService ) { }

  ngOnInit(): void {
  }

  activatedRegion( region: string ){
    if(region === this.activeRegion) return;

    this.activeRegion = region;
    this.countries = [];
    // console.log(this.activeRegion);
    
    // ccall service
    this.countryService
    .searchCountryByRegion( this.activeRegion )
    .subscribe( countries => this.countries = countries);
  }

  changeCssClasses( region: string ): string{
    return (region === this.activeRegion) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

}
