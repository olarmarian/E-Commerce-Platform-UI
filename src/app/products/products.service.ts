import { PageResponseModel } from './models/page-response.model';
import { PageRequestModel } from './models/page-request.model';
import { FiltersMetadataModel } from './models/filters-metadata.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getFilteredProducts(pageRequest: PageRequestModel) {
    this.http
      .post<PageResponseModel>(this.productsUrl + '/all', pageRequest, this.httpOptions)
      .subscribe((data) => {
        this.products.next(data.products);
      });
  }

  getProducts(pageRequest: PageRequestModel): Observable<ProductModel[]> {
    this.getFilteredProducts(pageRequest);
    return this.products.asObservable();
  }

  getProductFilters(): Observable<FiltersMetadataModel> {
    return this.http.get<any>(`${this.productsUrl}/metadata`, this.httpOptions);
  }
}
