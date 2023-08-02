import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {
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

  // fn to save email and password in local storage
  saveUserCredentialsinLocalStorage(myForm: any) {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    let encryptedPassword = window.btoa(password);
    localStorage.setItem('email', email);
    localStorage.setItem('password', encryptedPassword);
    this.resetForm(myForm);
  }

  //reset form after submit
  resetForm(myForm: any) {
    myForm.resetForm();
  }
}
