import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

interface User {
  id?       : string,
  email     : string,
  username  : string
}

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor( private http: HttpClient ) { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    const email: string = control.value;
    console.log(email);
    
    return this
          .http
          .get<User[]>(` http://localhost:3000/users?q=${email}`)
          .pipe(
            // delay only for undertand form's state
            // delay(3000),
            map( res => {
              return ( res.length === 0 ) ? null : { usedEmail: true }
            })
          );
  }
}
