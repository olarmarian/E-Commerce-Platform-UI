import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import {FormControl} from '@angular/forms';
import {SubSink} from 'subsink';
import {ProductsService} from '../../../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchBarControl = new FormControl();
  productNameToAutocomplete;
  private subs = new SubSink();
  constructor(private authService: AuthService,
              private router: Router,
              private productsService: ProductsService) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onSignUpClick() {
    this.router.navigate(['signup']);
  }

  onLogOutClick(){
    this.authService.logout();
    this.router.navigate(['products']);
  }

  onProductNameFilterChange() {
    const productName =  this.searchBarControl.value;
    this.subs.sink = this.productsService.getProductsByName(productName).subscribe((data) => {
      this.productNameToAutocomplete = data.products;
   });
  }

}
