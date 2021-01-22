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

  addProductToCart(product, productQuantity){
    if (product._id){
      const cart = {
        productId: product._id,
        quantity: productQuantity
      };
      this.addedProductsToCart.push(cart);
      localStorage.setItem('cart', JSON.stringify(this.addedProductsToCart));
      console.log(this.addedProductsToCart);
    }
  }

}
