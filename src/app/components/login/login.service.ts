import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
  // 'application/x-www-form-urlencoded'
});

const headerOptions = { headers: headers };

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

    //function to get captcha score
  getCaptchaScore(token: string): Observable<any> {
    let params = {
      secret: environment.recaptcha.secretKey,  // Secret key for the API
      response: token
    }
    return this.http.post('http://localhost:3000/login', params, headerOptions);
  }
}
