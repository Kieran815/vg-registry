import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
// MATERIAL IMPORTS

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  // Angular form control validations
  validEmail = new FormControl('', [Validators.required, Validators.email]);
  validPassword = new FormControl('', [Validators.required])
  

  constructor() { }

  ngOnInit(): void {
  }

  passLogin(): void {

  }

  // Angular form control validations
  getEmailErrorMessage() {
    if (this.validEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.validEmail.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    this.validPassword.hasError('required') ? 'You must enter a value': '';
  }

}
