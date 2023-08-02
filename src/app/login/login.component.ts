import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) {
    // creating instance of Login Form
    this.loginForm = this.fb.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {
  }

  createFormGroupInstance() {
    // creating instance of Login Form
    this.loginForm = this.fb.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  // fn to store form data in local storage
  onSubmit(myForm: any) {
    if (this.loginForm.invalid) {
      return
    } else {
      this.submitted = true;
      this.saveUserCredentialsinLocalStorage(myForm);
    }
  }

  // fn to save username and password in local storage
  saveUserCredentialsinLocalStorage(myForm: any) {
    let userName = this.loginForm.controls['userName'].value;
    let password = this.loginForm.controls['password'].value;
    localStorage.setItem('username', userName);
    localStorage.setItem('password', password);
    this.resetForm(myForm);
  }

  //reset form after submit
  resetForm(myForm: any) {
    myForm.resetForm();
  }
}
