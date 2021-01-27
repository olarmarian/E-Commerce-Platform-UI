import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product?: ProductModel;
  addedProductsToCart = [];
  constructor(private cartService: CartService) {}
  productReview = [0, 1, 2, 3, 4];
  ngOnInit(): void {}

  addProductToCart(product) {
    this.cartService.addToCart(product);
  }
}
