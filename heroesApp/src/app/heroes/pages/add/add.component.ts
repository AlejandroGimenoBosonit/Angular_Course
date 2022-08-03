import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  // To read URL
  constructor( private activatedRoutes: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoutes.params
        .subscribe( ({ id }) => console.log(id))
  }

}
