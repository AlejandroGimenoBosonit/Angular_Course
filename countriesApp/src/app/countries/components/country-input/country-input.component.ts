import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit {

  term: string = '';

  // output to emit our term to search the country 
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  // output emitted when user stops to write
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // placeholder from parent components
  @Input() placeholder: string = '';

  // special observable to deal with onDebounce
  debouncer: Subject<string> = new Subject();

  constructor() { }

  ngOnInit(): void { //Only is called when the component is initiallized
    
    /*
    Don't emit the subscribe until there are passed 300 ms since user stopped of typing
    */
    this.debouncer
    .pipe(
      // time in ms to emit the next value
      debounceTime( 300 )
    )
    .subscribe( value =>{
      console.log('debouncer: ', value);
      this.onDebounce.emit( value );
    })
  }

  searchCountry(){
    // emit output event 
    this.onEnter.emit( this.term );
  }

  pressKey(){
    // any time we press a key debiuncer is called to pass the next term value
    this.debouncer.next( this.term ); 
  }
}
