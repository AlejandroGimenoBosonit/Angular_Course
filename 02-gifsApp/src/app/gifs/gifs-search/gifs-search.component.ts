import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-search',
  templateUrl: './gifs-search.component.html',
  styleUrls: ['./gifs-search.component.css']
})
export class GifsSearchComponent implements OnInit {

  // service injection to access to the service's methods
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  // View HTML element with a local reference and assign it to a variable
  @ViewChild('inputData') inputData!: ElementRef<HTMLInputElement>;
/*
We use typescript not null assertion (!) to avoid a typescript possibly error or warning
"post-fix expression operator may be used to assert that its operand is non-null and 
non-undefined in contexts where the type checker is unable to conclude that fact. 
Specifically, the operation x! produces a value of the type of x with null and undefined 
excluded."

This data will be a type 'ElementRef', but it's a generic type <T=any>, so we need to 
specify the data type inside .In this case is an html input elment
*/
  searchMethod(){
    // console.log(searchQuery);
    const value = this.inputData.nativeElement.value;

    // call service method 
    this.gifsService.searchGifts(value);

    // purge input element
    this.inputData.nativeElement.value = '';
    
  }
}
