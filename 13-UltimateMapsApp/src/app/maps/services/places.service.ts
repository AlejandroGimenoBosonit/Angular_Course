import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesAPIClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation    : [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places         : Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor( 
    private pa: PlacesAPIClient,
    private ms: MapService
  ) { 
    // get user location in the first moment that someone use this service
    this.getUserLocation();
  }

  // methods
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [ coords.longitude, coords.latitude ] ; 
          resolve(this.useLocation);
        },
        (error) => {
          alert('Not possible to obtain the geolocation!');
          console.log(error);
          reject();
        }
      );
    });
  }

  getPlacesByQuery( query: string = '' ) {
    if( query.length == 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];

      return;
    }


    if( !this.useLocation ) throw Error('There is not "useLocation"');
    
    // loading state starts
    this.isLoadingPlaces = true;
    // console.log(this.useLocation.join(','));
    
    this.pa
        .get<PlacesResponse>(`/${query}.json`, {
          params: {
            proximity: this.useLocation.join(','),

          }
        })
        .subscribe( (res)=> {
          // loading state stops
          this.isLoadingPlaces = false;
          // set places array
          this.places = res.features;
          
          this.ms.createMarkersFromPlaces( this.places, this.useLocation! );
        });
  }

  deletePlaces() {
    this.places = [];
  }
}
