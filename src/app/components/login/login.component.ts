import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { privateKey, publicKey } from '../../config/config';
// import { JSEncrypt } from 'jsencrypt';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;
  submitted: boolean = false;
  plainText: string = ''; // Plaintext
  cipherText: string = ''; // Encrypted ciphertext
  jsenCrypt: any; // JSEncrypt Instance
  siteKey: string = environment.recaptcha.siteKey;
  secretKey: any;
  iv: any;
  encrypted: any = "";
  decrypted: string = "";

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    // creating instance of Login Form
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      // recaptcha: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // this.jsenCrypt = new JSEncrypt();
    this.secretKey = CryptoJS.lib.WordArray.random(256 / 8);
    this.iv = CryptoJS.lib.WordArray.random(128 / 8);
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
    let encryptWithAES = this.encryptDataUsingAES(password, this.secretKey);
    let decryptWithAES = this.decryptDataUsingAES(encryptWithAES, this.secretKey);
    console.log('Encrypted Pass',encryptWithAES);
    console.log('Decrypted Pass',decryptWithAES);
    // let encryptedPassword = this.encrypt(password);
    localStorage.setItem('email', email);
    localStorage.setItem('password', encryptWithAES);
    this.resolved();
    this.resetForm(myForm);
  }

  // fn to encrypt password using jsencrypt instance
  // encrypt(password: string) {
  //   const text = `${password}`.trim();
  //   this.jsenCrypt.setPublicKey(publicKey);
  //   this.cipherText = btoa(this.jsenCrypt.encrypt(text));
  //   this.decrypt();
  //   return this.cipherText;
  // }

  // fn to decrypt password using jsencrypt instance
  // decrypt() {
  //   this.jsenCrypt.setPrivateKey(privateKey);
  //   this.plainText = this.jsenCrypt.decrypt(atob(this.cipherText));
  //   if (Object.is(this.plainText, null)) {
  //     alert('Decryption failed');
  //   }
  //   console.log(this.plainText);
  // }

  // fn to check if the user is genuine or bot by evaluating captcha score
  resolved() {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        this.loginService.getCaptchaScore(token).subscribe(res => {
          if (res.score <= 0.3) {
            alert('Logged in by Bot');
          } else {
            alert('Logged in by User')
          }

        })
      });
  }

  //reset form after submit
  resetForm(myForm: any) {
    myForm.resetForm();
  }

  // fn to encrypt data using AES
  encryptDataUsingAES(data: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(this.iv)
    });

    return encrypted.toString();
  }

  // fn to decrypt data using AES
  decryptDataUsingAES(encryptedData: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(this.iv)
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
