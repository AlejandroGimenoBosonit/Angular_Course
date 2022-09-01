import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  // manual debounce timer
  private debounceTimer? : NodeJS.Timeout;

  constructor( private ps: PlacesService ) { }

  ngOnInit(): void {
  }

  // methods
  onQueryChanged( searchQuery: string = '' ) {
    // 1. Clear debounce timer
    if(this.debounceTimer) clearTimeout( this.debounceTimer );

    // 2. Set a new Timeout
    this.debounceTimer = setTimeout( ()=>{
      // call service's htp request every 350 ms that i stop to write
      this.ps.getPlacesByQuery( searchQuery );
      
    }, 350 )
    
  }

}
