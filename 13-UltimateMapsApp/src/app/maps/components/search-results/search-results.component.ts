import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/interfaces';
import { MapService } from '../../services';

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
}
