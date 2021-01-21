import { PageResponseModel } from './models/page-response.model';
import { PageRequestModel } from './models/page-request.model';
import { FiltersMetadataModel } from './models/filters-metadata.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ProductModel from './models/product.model';
import { BASE_URL, CORE_URLS, PRODUCT_URLS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl: string = BASE_URL + CORE_URLS.PRODUCTS;

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public products = new BehaviorSubject<ProductModel[]>([]);
  public total = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getFilteredProducts(pageRequest: PageRequestModel) {
    this.http
      .post<PageResponseModel>(this.productsUrl + PRODUCT_URLS.ALL, pageRequest, this.httpOptions)
      .subscribe((data) => {
        this.products.next(data.products);
        this.total.next(data.total);
      });
  }

  getProducts(pageRequest: PageRequestModel): Observable<ProductModel[]> {
    this.getFilteredProducts(pageRequest);
    return this.products.asObservable();
  }

  getTotal(): Observable<number>{
    return this.total.asObservable();
  }

  getProductFilters(): Observable<FiltersMetadataModel> {
    return this.http.get<any>(this.productsUrl + PRODUCT_URLS.METADATA, this.httpOptions);
  }

  getProductsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.productsUrl}?name=` + name, this.httpOptions);
  }
}
