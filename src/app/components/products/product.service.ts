import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //function to products
  getProductDetails(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  //function to fetch one product at a time
  getSingleProduct(ele: number): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${ele}`);
  }
}
