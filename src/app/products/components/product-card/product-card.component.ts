import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import ProductModel from '../../models/product.model';
import {ProductsModule} from '../../products.module';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product?: ProductModel;
  addedProductsToCart = [];
  constructor() {}

  ngOnInit(): void {
  }

  addProductToCart(productId){
    if (this.product?._id === productId) {
      this.addedProductsToCart.push(this.product);
    }
    localStorage.setItem('productId', JSON.stringify(this.addedProductsToCart));
  }

}
