import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ProductsService } from '../../../products/products.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private productsService: ProductsService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.email = null;
    this.name = null;

    this.subs.sink = this.authService.getUserEmail().subscribe((data) => {
      this.email = data;
    });

    this.subs.sink = this.profileService.getProfile(this.email).subscribe(
      (response) => {
        if (response) {
          console.log(response, 'resp');
          this.name = response.name;
        }
      },
      (error) => {
        this.snackBar.open(error.message, '', { duration: 3000 });
      }
    );
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

  onMyProfileClick() {
    this.router.navigate(['my-profile']);
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
}
