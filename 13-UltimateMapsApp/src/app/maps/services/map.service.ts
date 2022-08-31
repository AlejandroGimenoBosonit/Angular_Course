import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map? : Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  constructor() { }

  // methods
  flyTo( coords: LngLatLike ) {
    // is map ready ?
    if(!this.isMapReady) throw Error('The map is not initiated');

    this.map?.flyTo({
      center: coords,
      zoom: 14
    })
  }

  createMarkersFromPlaces( places: Feature[], userLocation: [number, number] ) {
    if( !this.map ) throw Error('Map not init!');
    

    this.markers.forEach( marker => marker.remove() );

    const newMarkers = [];

    for (const place of places){
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
        <h6>${ place.text }</h6>
        <span>${ place.place_name }</span>
      `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push( newMarker )


    }
    this.markers = newMarkers;
    if( places.length === 0 ) return;
    
    const bounds = new LngLatBounds();

    newMarkers.forEach( marker => bounds.extend(marker.getLngLat()) )
    bounds.extend(userLocation)

    this.map.fitBounds(bounds, {
      padding: 200  
    });
  }
}
