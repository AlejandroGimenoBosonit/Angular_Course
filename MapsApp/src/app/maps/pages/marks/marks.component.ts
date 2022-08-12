import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

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
  coordinates : [number, number] = [-0.40757115983516956, 39.4752606518945];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordinates, // starting position [lng, lat]
      zoom: this.zoomLvl
    });

    // marker
    // const marker = new mapboxgl.Marker().setLngLat(this.coordinates).addTo(this.map);
  }

  // methods
  addMarker() {
    // random hex code
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16))

    const marker = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat(this.coordinates).addTo(this.map);
  }
}
