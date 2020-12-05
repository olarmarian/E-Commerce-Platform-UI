import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ProductFiltersModel } from '../../models/product-filters.model';
import ProductModel from '../../models/product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  products: ProductModel[] = [];
  productFilters: ProductFiltersModel;
  areFiltersLoading: boolean = true;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.subs.sink = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.subs.sink = this.productsService
      .getProductFilters()
      .subscribe((filters) => {
        this.productFilters = filters;
        this.areFiltersLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
