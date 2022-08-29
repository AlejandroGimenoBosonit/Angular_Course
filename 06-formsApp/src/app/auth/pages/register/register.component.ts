import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  // reactive form - formGroup
  myForm: FormGroup = this.fb.group({
    name      : ['', [Validators.required, Validators.pattern( this.validations.nameInputPattern )]],
    email     : ['', [Validators.required, Validators.pattern( this.validations.emailInputPattern )], [this.emailValidator]],
    username  : ['', [Validators.required, this.validations.cannotBeStrider]],
    password1 : ['', [Validators.required, Validators.minLength(6)]],
    password2 : ['', [Validators.required]]
  },
  // secondary object - option to the FormGroup itself
  {
    validators: [this.validations.fieldsMatches( 'password1', 'password2' )]
  }
  );
  // formBuilder and validation service injection
  constructor( 
    private fb              : FormBuilder,
    private validations     : ValidatorService,
    private emailValidator  : EmailValidatorService
  ) { }

  ngOnInit(): void {
    //  default form values
    // this.myForm.reset({
    //   name    : 'John Doe',
    //   email   : 'johnDoe54@fakemail.com',
    //   username: 'John_doe54'
    // })
  }

  get emailErrorMssg(): string {
    const error = this.myForm.get('email')?.errors;
    
    if(error?.['required']){
      return 'Email is required';
    }else if(error?.['pattern']) {
      return 'Email format invalid';
    }else if(error?.['usedEmail']){
      return 'Email is in use';
    }

    return '';
  }

  // methods

  // conditional way to  display error messages
  validField( field: string ) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }


  submitForm() {
    // console.log(this.myForm.value);

    // mark all fields as touched to switch validations
    this.myForm.markAllAsTouched();
  }

}
