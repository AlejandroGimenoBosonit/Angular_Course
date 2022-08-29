import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
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
`]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  // use viewChild to take an HTML as a property
  @ViewChild('map') divMap!: ElementRef;

  map!        : mapboxgl.Map;
  zoomLvl     : number = 10;
  coordinates : [number, number] = [-0.40757115983516956, 39.4752606518945];

  constructor() { }
  
/*
  We cannot access to the html reference wit hviewchild on ngOnInit because this variable has not a value,
  but ngAfterViewInit is invoked immediately after Angular has completed initialization of a component's view.
*/
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordinates, // starting position [lng, lat]
      zoom: this.zoomLvl
    });

    // event listener to get zoom value when user scrolls mouse
    this.map.on('zoom', ()=> this.zoomLvl = this.map.getZoom());

    // event listener to get a maximum zoom
    this.map.on('zoomend', ()=>{
      if(this.map.getZoom() > 18) this.map.zoomTo(18);
    });

    // event listener to detect map mov.
    this.map.on('move', ( event )=>{
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.coordinates = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    // Purge any event listener when component is not loaded
    this.map.off('zoom', ()=>{});
    this.map.off('zoomend', ()=>{});
    this.map.off('move', ()=>{});
  }



  //  Methods
  zoomOut(){
    this.map.zoomOut();
    this.zoomLvl = this.map.getZoom();
  }
  zoomIn(){
    this.map.zoomIn();
    this.zoomLvl = this.map.getZoom();
  }

  zoomChange(zoomValue: string){
    this.map.zoomTo( Number( zoomValue ) );
  }
}
 