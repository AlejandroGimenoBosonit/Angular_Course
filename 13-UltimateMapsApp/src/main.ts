import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// mapbox integration
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWdpbWF0IiwiYSI6ImNsNnE0MG53cjA2b28zY24yN2VodGRlb3YifQ.7AkwIHZkUYezvasfJgw4Zw';


// check if browser allows geolocation
if( !navigator.geolocation ){
  // show alert
  alert('Your browser doesn\'t support geolocation!');
  // notify by console
  throw new Error('Your browser doesn\'t support geolocation!');
  
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
