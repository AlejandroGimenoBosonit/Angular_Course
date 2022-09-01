import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [
  ]
})
export class MapScreenComponent implements OnInit {

  // Want this component is looking for our service's getter
  get isUserLocationReady() {
    return this.ps.isUserLocationReady;
  }

  constructor( private ps: PlacesService ) { }

  ngOnInit(): void {
  }

}
