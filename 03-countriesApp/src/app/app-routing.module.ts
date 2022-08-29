import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ByCountryComponent } from './countries/pages/by-country/by-country.component';
import { ByRegionComponent } from './countries/pages/by-region/by-region.component';
import { ByCapitalComponent } from './countries/pages/by-capital/by-capital.component';
import { ViewCountryComponent } from './countries/pages/view-country/view-country.component';

// routes
const routes: Routes = [
    {
        path:'',
        component: ByCountryComponent,
        pathMatch: 'full'
    },
    {
        path:'region',
        component: ByRegionComponent
    },
    {
        path:'capital',
        component: ByCapitalComponent
    },
    {
        path:'country/:countryId',
        component: ViewCountryComponent
    },
    // Any other route will redirect to this one
    {
        path: '**',
        redirectTo: '' // redirect to path ''
        // possible to do component: 404Component
    }
];


//decorator
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}