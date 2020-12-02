import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import ProductModel from '../../models/product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  public products: ProductModel[] = [];
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.subs.sink = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
