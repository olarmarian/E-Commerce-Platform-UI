import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductFiltersModel } from './models/product-filters.model';
import ProductModel from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl: string = 'http://localhost:3000/products';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public products = new BehaviorSubject<ProductModel[]>([]);

  constructor(private http: HttpClient) {}

  getFilteredProducts(filters: any) {
    this.http
      .post<ProductModel[]>(this.productsUrl + '/all', filters, this.httpOptions)
      .subscribe((data) => {
        this.products.next(data);
      });
  }
  
  getProducts(filters: any): Observable<ProductModel[]> {
    this.getFilteredProducts(filters);
    return this.products.asObservable();
  }

  getProductFilters(): Observable<ProductFiltersModel> {
    return this.http.get<any>(`${this.productsUrl}/filters`, this.httpOptions);
  }
}
