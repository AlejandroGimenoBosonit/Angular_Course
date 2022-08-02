import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-not-common',
  templateUrl: './not-common.component.html',
  styles: [
  ]
})
export class NotCommonComponent implements OnInit {

  // i18nSelect Pipe
  name  : string = 'Jane';
  genre : string = 'male';

  genreMapping = {
    'female': 'Her',
    'male':'His'
  };

  nameMapping = {
    'female': 'Jane',
    'male':'John'
  }
  ////////////////////////////

  // I18nPluralPipe
  messages        : string[] = ['Message 1', 'Message 2', 'Message 3', 'Message 4'];

  messageMapping  :{[k: string]: string} = {
    '=0':'No messages',
    '=1':'One message',
    'other':'# messages'
  };
  //////////////////

  // KeyValuePipe
  personObject = {
    name : 'John Doe',
    age: 30,
    location: 'Ottawa, Canada '
  };
  ////////////////////////////

  // Json Pipe
  heroes = [
    {
      name: 'Superman',
      fly: true
    },
    {
      name: 'Spiderman',
      fly: false
    },
    {
      name: 'Aquaman',
      fly: false
    }
  ];
  ////////////////////////////

  // Async Pipe
  // Observable to use pipe
  myObservable = interval( 1000 ); // 0, 1, 2, 3, 4, ..., 1000

  // Promise
  promiseValue = new Promise( (resolve, reject)=>{
    setTimeout( () => {
      // prints a message at 3500 ms = 3.5 s
      resolve('Promise End')
    }, 3500 );
  } );
  ////////////////////////////
  constructor() {
    // Test observable to console
    // this.myObservable.subscribe( console.log );
  }

  ngOnInit(): void {
  }

  changeGenre() {
    (this.genre === 'male') ? this.genre = 'female' : this.genre = 'male';
  }
  deleteMessage() {
    this.messages.pop();
  }

}
