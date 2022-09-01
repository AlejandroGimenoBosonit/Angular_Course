// CUSTOM CLIENT TO MAKE REQUEST TO THE MAPBOX API - DIRECTIONS

import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class DirectionsAPIClient extends HttpClient {
    // base url
    public baseUrl: string = "https://api.mapbox.com/directions/v5/mapbox/driving";

    constructor( handler: HttpHandler ) {
        super(handler);
    }

    public override get<T>(url: string) {

        url = this.baseUrl + url;
        // console.log(url);
        

        return super.get<T>( url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'es',
                overview: 'simplified',
                steps: true,
                access_token: environment.apiKey
            }
        } );
    }
}