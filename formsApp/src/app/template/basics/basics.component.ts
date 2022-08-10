import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
})
export class BasicsComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm; 

  constructor() { }

  ngOnInit(): void {
  }

  // methods
  validName(): boolean {
    return this.myForm?.controls['productName']?.invalid && this.myForm?.controls['productName']?.touched
  }

  validPrice(): boolean {
    return this.myForm?.controls['productPrice']?.touched && this.myForm?.controls['productName']?.value < 0
  }

  takeInfo() {
     console.log(this.myForm);
     
     this.myForm.resetForm({
      productPrice: 0,
      productStock: 0
     });
  }
}
