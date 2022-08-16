import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface markerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      border-radius:5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
`]
})
export class MarksComponent implements AfterViewInit {
  // use viewChild to take an HTML as a property
  @ViewChild('map') divMap!: ElementRef;

  map!        : mapboxgl.Map;
  zoomLvl     : number = 15;
  coordinates : [number, number] = [-0.40757115983516956, 39.4752606518945]; //lng, lat

  markers: markerColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordinates, // starting position [lng, lat]
      zoom: this.zoomLvl
    });

    // When map has been created read localstorage for markers
    this.readLocalStorage();    
  }



  // methods
  addMarker() {
    // random hex code
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16))

    const marker = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat(this.coordinates).addTo(this.map);

    // Add marker to markers array
    this.markers.push( {color, marker} );

    // When marker is created, store it in local storage
    this.saveLocalStorage(); 

    // when marker is created and storedin locasStorage we create a listener
    // when marker ends to be dragged, update its coordinates
    marker.on('dragend', () => this.saveLocalStorage());
  }



  // Update marker's center property 
  goToMarker( marker: markerColor): void {
    const { lng, lat } = marker['marker']!.getLngLat();

    this.map.flyTo( {
      center: { lng, lat } 
    } )
    // console.log(this.map.getCenter()['lng'], this.map.getCenter()['lat']);
    // console.log(marker['marker']!.getLngLat());
    
    
  }



  // store markers in local storage
  saveLocalStorage() {
    
    const lngLatArr: markerColor[] = [];
    
    this.markers.forEach( marker => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lngLatArr.push({ color,  center: [lng, lat]}) 
    });

    // storage 
    localStorage.setItem('markers', JSON.stringify(lngLatArr));
  }

  
  // read markers from local storage
  readLocalStorage() {
    // check for markers in local storage
    if( !localStorage.getItem('markers') ) return;

    const lngLatArr: markerColor[] = JSON.parse( localStorage.getItem('markers')! );
    
    // create markers if there are stored in localstorage
    lngLatArr.forEach( marker => {
      
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: marker.color
      })
      .setLngLat( marker.center! )
      .addTo(this.map);
    

      // update markers array
      this.markers.push({
        marker: newMarker,
        color: marker.color
      });


      // when marker is created and storedin locasStorage we create a listener
      // when marker ends to be dragged, update its coordinates
      newMarker.on('dragend', () => this.saveLocalStorage());
    });
    
  }


  // delete marker
  deleteMarker( index: number ) {
    
    // delete map marker from markers array
    this.markers[index].marker?.remove();
    // delete marker form local array
    this.markers.splice(index, 1);
    // update local storage
    this.saveLocalStorage();

  }
}
