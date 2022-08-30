import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styles: [
  ]
})
export class Page1Component 
  implements OnInit, OnChanges, DoCheck, 
            AfterContentInit, AfterContentChecked, AfterViewInit,
            AfterViewChecked, OnDestroy  {


  name    : string = 'John Doe';
  seconds : number = 0;
  timerSubscription!: Subscription;

  constructor() { 
    // injections and declarations before HTML construction
    console.log('constructor');
    
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('Method not implemented.');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewInit');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.timerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // When HTML is created and we can access to it
    console.log('ngOnInit');
    this.timerSubscription = interval(1000).subscribe( i => this.seconds=i )
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  save() {

  }

}
