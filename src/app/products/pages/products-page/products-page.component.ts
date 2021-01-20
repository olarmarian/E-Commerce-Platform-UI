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
    sort: '',
    pageSize: 10,
    page: 0,
    total: 0,
  };

  constructor(private productsService: ProductsService) {}

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
      .getProducts(this.formatProductsPageRequest(this.requestMetadata))
      .subscribe((data) => {
        this.products = data;
      });
    this.subs.sink = this.productsService.getTotal().subscribe((data) => {
      this.requestMetadata.total = data;
    });
  }

  onCategoriesFilterChange($event: any) {
    this.requestMetadata.categories = $event;
    this.productsService.getFilteredProducts(
      this.formatProductsPageRequest(this.requestMetadata)
    );
  }

  onPriceChange(value) {
    this.requestMetadata.maxPrice = value;
    this.productsService.getFilteredProducts(
      this.formatProductsPageRequest(this.requestMetadata)
    );
  }

  onSortChange(value) {
    this.requestMetadata.sort = value;
    this.productsService.getFilteredProducts(
      this.formatProductsPageRequest(this.requestMetadata)
    );
  }

  onPaginationChange(value) {
    this.requestMetadata.page = value.pageIndex;
    this.requestMetadata.pageSize = value.pageSize;

    this.productsService.getFilteredProducts(
      this.formatProductsPageRequest(this.requestMetadata)
    );
  }

  formatProductsPageRequest(requestMetadata): any {
    return {
      pageRequest: {
        filters: {
          categories: requestMetadata.categories,
          priceLimits: {
            minPrice: requestMetadata.minPrice,
            maxPrice: requestMetadata.maxPrice,
          },
        },
        sort: requestMetadata.sort,
        pagination: {
          page: requestMetadata.page,
          size: requestMetadata.pageSize,
        },
      },
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
