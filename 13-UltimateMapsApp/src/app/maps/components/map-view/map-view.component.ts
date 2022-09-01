import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { PlacesService, MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  // viewchild to see our local refrence
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor( 
    private ps: PlacesService,
    private ms: MapService
  ) { }

  ngAfterViewInit(): void {
    /*
    A lifecycle hook that is called after Angular has fully initialized 
    a component's view. Define an ngAfterViewInit() method to handle any 
    additional initialization tasks.
    */

    if(!this.ps.useLocation) throw new Error('"useLocation" not found!');


    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement, // html element
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.ps.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
    });
      
    const popup = new Popup().setHTML(`
      <h6>Here I am!</h6>
      <span>This is my place!</span>
    `);

    new Marker({ color: 'red' })
    .setLngLat( this.ps.useLocation )
    .setPopup( popup )
    .addTo( map );


    this.ms.setMap( map );
  }

}
