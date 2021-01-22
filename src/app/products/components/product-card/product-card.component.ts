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

  ngOnInit(): void {}

  addProductToCart(product) {
    console.log(product, "Add to cart")
    this.cartService.addToCart(product);
  }
}
