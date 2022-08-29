import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountryByAlphaCodeSmall, CountryByCode_Name } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region    : ['', Validators.required],
    country   : ['', Validators.required],
    frontier  : ['', Validators.required]
  });

 
  regions       : string[]                  = [];
  countries     : CountryByCode_Name[]      = [];
  // frontiers     : string[]              = [];
  frontiers     : CountryByAlphaCodeSmall[] = [];

  // UI Loading
  loading: boolean = true;

  constructor( 
      private fb: FormBuilder, 
      private cs: CountriesService  
    ) { }

  ngOnInit(): void {
    // set regions data from service getter
    this.regions = this.cs.regions;

    // this.myForm
    //     .get('region')
    //     ?.valueChanges
    //     .subscribe( region => {
    //       console.log(region);
          
    //       // calling service request
    //       this.cs
    //           .getCountriesByRegion( region )
    //           .subscribe( response => {
    //             console.log(response);
                
    //             // update local state
    //             this.countries = response;
    //           });
    //     });

    // when region changes
    this.myForm.get('region')
              ?.valueChanges
              .pipe(
                // purge previous region value
                tap( ( _ ) => { // underscore as a parameter means "ignore this binding/parameter"
                  this.myForm.get('country')?.reset('');
                  // app loading
                  this.loading = true;
                }),
                switchMap( region => this.cs.getCountriesByRegion( region ) )
              )
              .subscribe( countries => {
                this.countries = countries;
                this.loading = false;
              })
    // when country changes
    this.myForm.get('country')
              ?.valueChanges
              .pipe(
                tap( ( _ ) => {
                  this.myForm.get('frontier')?.reset('');
                  this.loading = true;
                }),
                switchMap( code => this.cs.getCountryBtAlpha3Code( code )),
                switchMap( country => this.cs.getCountryBorders( country?.borders! ))
              )
              .subscribe( countries => {
                // this.frontiers = country?.borders || [];
                this.frontiers = countries;
                this.loading = false;
              })
  }

  //  methods
  saveData() {
    console.log(this.myForm.value);
    
  }

}
