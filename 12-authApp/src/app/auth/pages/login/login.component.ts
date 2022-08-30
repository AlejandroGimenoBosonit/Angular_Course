import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email   : ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })

  constructor( 
    private fb    : FormBuilder,
    private router: Router,
    private auth  : AuthService 
  ) { }

  ngOnInit(): void {
  }

  // methods
  login(){
    // console.log(this.myForm.value);
    
    const { email, password } = this.myForm.value;
    // request
    this.auth
        .login({ email, password })
        .subscribe( ok =>{
          // console.log(ok);
          if( ok === true){
            // navigate to dashboard once login process is done
            this.router.navigateByUrl('/dashboard');
          }else{
            // Display error by SweetAlert
            Swal.fire('Something went wrong!', ok, 'error');
          }
        });    
  }

}
