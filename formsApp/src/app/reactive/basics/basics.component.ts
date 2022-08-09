import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
})
export class BasicsComponent implements OnInit {

  // Init our reactive form
  // myForm: FormGroup = new FormGroup({
  //   'productName'   : new FormControl('RTX 4080TI'),
  //   'productPrice'  : new FormControl(1500),
  //   'productStock'  : new FormControl(6)

  // });

  // Init our reactive form with formBuilder
  myForm: FormGroup = this.fb.group({
    productName   : [
      // Default Value
      '',
      // syncronous validators
      [Validators.required, Validators.minLength(3)],
      // async validators

    ],
    productPrice  : [null, [ Validators.required, Validators.min(0)]],
    productStock  : [null, [Validators.required, Validators.min(0)]]
  });

 

  // formBuilder injection
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.myForm.reset({
      productName   : 'RTX 4080ti',
      productPrice  : 1600,
      productStock  : 6
    })
  }

  validField( field: string ): boolean {
    return this.myForm.controls[field]?.errors! && this.myForm?.controls[field]?.touched!
  }

  save() {
    // check if form is valid
    if(this.myForm.invalid){
      // touch every field to display error messages
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    // reset form values
    this.myForm.reset();
    
  }
}
