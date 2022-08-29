import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    genre           : ['M', Validators.required],
    notifications   : [true, Validators.required],
    conditions      : [false, Validators.requiredTrue]
  });

  person = {
    genre: 'F',
    notifications: true
  };

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.myForm.reset({
      ...this.person,
      conditions: false
    });

    // extract from an observable the wanted info
    // this.myForm.valueChanges.subscribe( form => {
    //   // js expression to delete not-wanted info
    //   delete form.conditions;
    //   this.person = form;
    // });

    //alternative extracting conditions
    this.myForm.valueChanges.subscribe( ({conditions, ...rest}) => {
      this.person = rest;
    });
  }

  save() {
    const formValue = { ...this.myForm.value };

    console.log(formValue);
    
  }

}
