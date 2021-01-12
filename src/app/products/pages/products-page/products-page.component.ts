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

  selectedFilters = {
    categories: [],
    minPrice: 0,
    maxPrice: 0,
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.subs.sink = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.subs.sink = this.productsService
      .getProductFilters()
      .subscribe((filters) => {
        this.productFilters = filters;
        this.selectedFilters.minPrice = filters.priceLimits.minPrice;
        this.selectedFilters.maxPrice = filters.priceLimits.maxPrice;
        this.areFiltersLoading = false;
      });
  }

  onCategoriesFilterChange($event: any) {
    this.selectedFilters.categories = $event;
    this.productsService.getFilteredProducts(this.formatLoadProductsFilters(this.selectedFilters));
  }

  onPriceChange(value){
    this.selectedFilters.maxPrice = value;
    this.productsService.getFilteredProducts(this.formatLoadProductsFilters(this.selectedFilters));
  }

  formatLoadProductsFilters(productsFilters): any {
    return {
      filters: {
        categories: productsFilters.categories,
        priceLimits: {
          minPrice: productsFilters.minPrice,
          maxPrice: productsFilters.maxPrice,
        },
      },
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
