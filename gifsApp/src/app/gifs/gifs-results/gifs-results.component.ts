import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-results',
  templateUrl: './gifs-results.component.html',
  styleUrls: ['./gifs-results.component.css']
})
export class GifsResultsComponent implements OnInit {

  // service injection
  constructor( private gifsService: GifsService ) { }

  ngOnInit(): void {
  }

  get results(){
    return this.gifsService.results;
  }

}
