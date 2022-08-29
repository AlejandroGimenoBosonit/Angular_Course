import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #map {
      width: 100%;
      height: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-0.40757115983516956, 39.4752606518945], // starting position [lng, lat]
      zoom: 18
    });
  }
}
