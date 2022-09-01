import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature, Properties } from '../interfaces/places';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { DirectionsAPIClient } from '../api';


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

  constructor( private directionsAPI: DirectionsAPIClient ) { }

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


  // DIRECTIONS

  // when user clicks in 'Direction' button
  getRouteBetweenPoints( start: [number, number], end: [number, number] ) {
    // calling curstom directions method
    /*
    url-p21: "https://api.mapbox.com/directions/v5/mapbox/driving"
    /
    url-pt2: "start1,start2,end1,end2"
    /
    alternatives,geometries,language,overview,steps,access_token
    */
    this.directionsAPI.get<DirectionsResponse>(`/${start.join('%2C')};${end.join('%2C')}`)
                      .subscribe( res => this.drawPolyline(res.routes[0]) );

  }

  // Draw line between points
  private drawPolyline( route: Route ) {
    // print info
    console.log(
      // distance in km and duration in mins
      { kms: route.distance/1000, duration: route.duration/60 }
    );

    // setting bounds again
    const coords = route.geometry.coordinates;
    const tart = coords[0] as [number, number];

    const bounds = new LngLatBounds();

    coords.forEach( ([ lng, lat ])=>{
      bounds.extend([ lng, lat ]);
    } );

    this.map?.fitBounds( bounds,
      {
        padding: 200
      } );

    // draw polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    // Clean previous route
    if (this.map?.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }


    this.map?.addSource('RouteString', sourceData);

    this.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }
}
