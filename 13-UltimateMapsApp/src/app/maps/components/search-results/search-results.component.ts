import { Component, OnInit } from '@angular/core';
import { PlacesService, MapService } from '../../services';
import { Feature } from '../../interfaces/places';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId: string = '';

  constructor( 
    private ps: PlacesService,
    private ms: MapService
  ) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces(): boolean {
    return this.ps.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.ps.places;
  }

  flyTo( place: Feature ) {
    
    this.selectedId = place.id;
    
    const [lng, lat] = place.center;
    this.ms.flyTo([lng, lat]);
  }

  getDirections( place: Feature ) {

    if(!this.ps.useLocation) throw Error('There is not "useLocation"');

    // delete places to hide the menu
    this.ps.deletePlaces();

    // calling map service and connect to custom direction method
    //start = useLocation
    const start = this.ps.useLocation;
    // console.log(start);
    
    //end = destiny = center
    const end = place.center as [number, number];
    // console.log(end);
    
    
    this.ms.getRouteBetweenPoints(start, end);
    
    
  }
}
