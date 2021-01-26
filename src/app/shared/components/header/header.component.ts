import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ProductsService } from '../../../products/products.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart.model';
import { CartItemModel } from '../../models/cart-item.model';
import ProductModel from 'src/app/products/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {LABELS} from '../../../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchBarControl = new FormControl();
  productNamesToAutocomplete: [];

  private subs = new SubSink();
  email: string;
  name: string;
  cartData = new BehaviorSubject<any>({
    items: [],
    subtotal: 0,
  });

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private productsService: ProductsService,
    private profileService: ProfileService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.email = null;
    this.name = null;
    this.subs.sink = this.authService.getUserEmail().subscribe((data) => {
      this.email = data;
    });

    this.subs.sink = this.profileService.getProfile(this.email).subscribe(
      (response) => {
        this.name = response.name;
      },
      (error) => {
        this.snackBar.open(error.message, '', {duration: 3000});
      }
    );

    this.subs.sink = this.cartService.getCart().subscribe((data) => {
      const newCartData = {
        items: [],
        subtotal: 0,
      };
      // console.log(data, 'data');

      data.items.forEach((item: CartItemModel) => {
        newCartData.items.push({
          product: item.product,
          quantity: item.quantity,
        });

        newCartData.subtotal =
          newCartData.subtotal + item.product.price * item.quantity;
      });
      // console.log(newCartData, 'new cart data');
      this.cartData.next(newCartData);
      console.log(this.cartData.value.items.length);
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onSignUpClick() {
    this.router.navigate(['signup']);
  }

  onLogOutClick() {
    this.authService.logout();
    this.router.navigate(['products']);
  }

  onProductNameFilterChange() {
    const productName = this.searchBarControl.value;
    this.subs.sink = this.productsService
      .getProductsByName(productName)
      .subscribe((data) => {
        this.productNamesToAutocomplete = data.products;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  deleteProduct(item) {
    const cartData = this.cartData.value.items;
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].product._id === item.product._id) {
        cartData.splice(i, 1);
        this.cartData.value.subtotal -= (item.product.price * item.quantity);
      }
    }
  }
}
