import { CategoryEnum } from './../../models/category.enum';
import { PageRequestModel } from './../../models/page-request.model';
import { FiltersMetadataModel } from './../../models/filters-metadata.model';
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

  products: ProductModel[] = [];
  productFilters: FiltersMetadataModel;
  areFiltersLoading: boolean = true;

  requestMetadata = {
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    sort: ''
  };


  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subs.sink = this.productsService
      .getProductFilters()
      .subscribe((filters) => {
        this.productFilters = filters;
        this.requestMetadata.minPrice = filters.priceLimits.minPrice;
        this.requestMetadata.maxPrice = filters.priceLimits.maxPrice;
        this.areFiltersLoading = false;
      });

    this.subs.sink = this.productsService
      .getProducts(this.formatLoadProductsFilters(this.requestMetadata))
      .subscribe((data) => {
        this.products = data;
      });
  }

  onCategoriesFilterChange($event: any) {
    this.requestMetadata.categories = $event;
    this.productsService.getFilteredProducts(
      this.formatLoadProductsFilters(this.requestMetadata)
    );
  }

  onPriceChange(value) {
    this.requestMetadata.maxPrice = value;
    this.productsService.getFilteredProducts(
      this.formatLoadProductsFilters(this.requestMetadata)
    );
  }

  onSortChange(value){
    this.requestMetadata.sort = value;
    this.productsService.getFilteredProducts(
      this.formatLoadProductsFilters(this.requestMetadata)
    );
  }
  formatLoadProductsFilters(productsFilters): any {
    return {
      pageRequest: {
        filters: {
          categories: productsFilters.categories,
          priceLimits: {
            minPrice: productsFilters.minPrice,
            maxPrice: productsFilters.maxPrice
          }
        },
        sort: productsFilters.sort
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
