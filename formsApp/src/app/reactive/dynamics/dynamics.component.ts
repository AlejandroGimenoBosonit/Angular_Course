import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    personName: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames : this.fb.array([
      ['Minecraft'],['The Binding of Isaac']
    ], Validators.required)
  });

  newFavGame: FormControl = this.fb.control('', Validators.required );

  constructor( private fb: FormBuilder ) { }

  // getter to obtain favorite games to iterate in html
  get getFavsGame() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  ngOnInit(): void {
  }

  validField( field: string ): boolean {
    return this.myForm.controls[field]?.errors! && this.myForm?.controls[field]?.touched!
  }

  addFavGame(){
    if(this.newFavGame.invalid){ return; }

      //  calling getter
      this.getFavsGame.push(new FormControl(this.newFavGame.value, Validators.required))
      // alternative using form builder
      // this.getFavsGame.push( this.fb.control(this.newFavGame.value, Validators.required))

      this.newFavGame.reset();
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

  delete(index: number) {
    this.getFavsGame.removeAt( index );
  }

}
