import { Component, OnInit } from '@angular/core';
import { PlacesService, MapService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(
    private ps: PlacesService,
    private ms: MapService
  ) { }

  ngOnInit(): void {
  }

  // methods
  gotToMyLocation() {
    if(!this.ps.isUserLocationReady) throw Error('There is not user location!');
    if(!this.ms.isMapReady) throw Error('The map is not initiated!');
    
    // call map service's 'flyTo' method with place service's coords
    this.ms.flyTo( this.ps.useLocation! )
    
  }

}
