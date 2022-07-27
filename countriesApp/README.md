# CountriesApp
```
src
└── app
    │
    ├── countries
    │   ├── components
    │   │
    │   ├── interfaces
    │   │
    │   ├── pages
    │   │
    │   ├── services
    │   │
    │   └── countries.module.ts
    ├── Shared
    │   ├── sidebar
    │   │   ├── sidebar.component.ts
    │   │   ├── sidebar.component.html
    │   │   └── sidebar.component.css
    │   │
    │   └── shared.module.css
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    │ 
    └── app.module.ts

```

```
ng new countriesApp

cd countriesApp/

ng g m countries
ng g m shared

ng g c shared/sidebar --skip-tests
ng g c countries/pages/byCapital --skip-tests --inline-style 
ng g c countries/pages/byCountry --skip-tests --inline-style
ng g c countries/pages/byRegion --skip-tests --inline-style 
ng g c countries/pages/viewCountry --skip-tests --inline-style
```

SidebarComponent use out of shared so we edit module
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedModule { }

```

Same with countries module
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { ViewCountryComponent } from './pages/view-country/view-country.component';



@NgModule({
  declarations: [
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    ViewCountryComponent
  ],
  exports:[
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    ViewCountryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountriesModule { }

```
For all this we want to update app module
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CountriesModule } from './countries/countries.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // modules used outside its component
    CountriesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


