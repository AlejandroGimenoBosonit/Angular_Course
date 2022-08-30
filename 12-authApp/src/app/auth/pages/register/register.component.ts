import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name      : [ '', [Validators.required] ],
    email     : [ '', [Validators.required, Validators.email] ],
    password  : [ '', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( 
    private fb    : FormBuilder,
    private auth  : AuthService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  // methods
  register(){

    const { name, email, password } = this.myForm.value;

    // request
    this.auth
        .register({ name, email, password })
        .subscribe( ok =>{
          if( ok === true){
            // navigate to dashboard once login process is done
            this.router.navigateByUrl('/dashboard');
          }else{
            // Display error by SweetAlert
            Swal.fire('Something went wrong!', ok, 'error');
          }
        });

    // navigate to dashboard once register process is done
    // this.router.navigateByUrl('/dashboard');

  }

}
