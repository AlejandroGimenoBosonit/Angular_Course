import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // service injection to access to the service's methods
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  // get gifs.service.ts
  get history(){
    return this.gifsService.history;
  }

  searchBySidebar( gifText: string ){
    // request
    this.gifsService.searchGifts(gifText);
  }
}
