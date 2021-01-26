import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LABELS } from 'src/app/constants';
import ProductModel from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<CartModel>({
    items: [],
  });

  loadCart(): void {
    const cartString: string = localStorage.getItem(LABELS.CART);
    const items: CartItemModel[] = JSON.parse(cartString);

    if (items) {
      this.cart.next({ items });
    } else {
      this.createEmptyCart();
    }
  }

  getCart(): Observable<CartModel> {
    this.loadCart();
    return this.cart.asObservable();
  }

  private createEmptyCart() {
    localStorage.setItem(LABELS.CART, JSON.stringify([]));
  }

  addToCart(product: ProductModel) {
    var cart: CartModel;
    this.getCart().subscribe((data) => {
      cart = data;
    });
    if (this.isProductAlreadyInCart(product)) {
      const existentItemIndex = this.existentProductIndex(product);

      cart.items[existentItemIndex].quantity =
        cart.items[existentItemIndex].quantity + 1;
    } else {
      cart.items.push({ product, quantity: 1 });
    }
    localStorage.setItem(LABELS.CART, JSON.stringify(cart.items));
    this.loadCart();
  }

  removeFromCart(id: string) {
    var cart: CartModel;
    this.getCart().subscribe((data) => {
      cart = data;
    });

    const updatedCartItems: CartItemModel[] = cart.items.filter(
      (item: CartItemModel) => item.product._id !== id
    );
    localStorage.setItem(LABELS.CART, JSON.stringify(updatedCartItems));
    this.loadCart();
  }

  updateQuantity(id: string, quantity: number) {
    this.loadCart();
  }

  private isProductAlreadyInCart(product: ProductModel): boolean {
    var cart: CartModel;
    this.getCart().subscribe((data) => {
      cart = data;
    });

    return (
      cart.items.find(
        (item: CartItemModel) => item.product._id === product._id
      ) != null
    );
  }

  private existentProductIndex(product: ProductModel): number {
    var cart: CartModel;
    this.getCart().subscribe((data) => {
      cart = data;
    });
    return cart.items.findIndex(
      (item: CartItemModel) => item.product._id === product._id
    );
  }
}
