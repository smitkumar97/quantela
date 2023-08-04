import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { privateKey, publicKey } from '../config/config';
import { JSEncrypt } from 'jsencrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  submitted = false;
  plainText: string = ''; // Plaintext
	cypherText: string = ''; // Encrypted ciphertext
	jsenCrypt: any; // JSEncrypt Instance

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
    this.jsenCrypt = new JSEncrypt();
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
    let encryptedPassword = this.encrypt(password);
    localStorage.setItem('email', email);
    localStorage.setItem('password', encryptedPassword);
    this.resetForm(myForm);
  }

  // fn to encrypt password using jsencrypt instance
  encrypt(password: string) {
		const text = `${password}`.trim();
    this.jsenCrypt.setPublicKey(publicKey);
    this.cypherText = btoa(this.jsenCrypt.encrypt(text));
    this.decrypt();
    return this.cypherText;
  }

  // fn to decrypt password using jsencrypt instance
  decrypt() {
		this.jsenCrypt.setPrivateKey(privateKey);
		this.plainText = this.jsenCrypt.decrypt(atob(this.cypherText));
		if (Object.is(this.plainText, null)) {
			alert('Decryption failed');
    }
    console.log(this.plainText);
  }

  //reset form after submit
  resetForm(myForm: any) {
    myForm.resetForm();
  }
}
