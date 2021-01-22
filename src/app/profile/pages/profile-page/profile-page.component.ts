import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/security/auth.service';
import { SubSink } from 'subsink';
import { AddressFormPopupComponent } from '../../components/address-form-popup/address-form-popup.component';
import { CardFormPopupComponent } from '../../components/card-form-popup/card-form-popup.component';
import { AddressModel } from '../../models/address.model';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  private email: string;
  profile: ProfileModel;

  cardsTitles = {
    addresses: 'Your Addresses',
    cards: 'Your Cards',
  };

  creditCards: any[] = [
    {
      number: '1234 1235 1235 1235',
      owner: 'Olar Marian',
      expiryAt: '2022-10-10',
      name: 'BT CARD',
      type: 'VISA',
    },
    {
      number: '1234 1235 1235 1235',
      owner: 'Olar Marian',
      expiryAt: '2022-10-10',
      name: 'BT CARD',
      type: 'VISA',
    },
    {
      number: '1234 1235 1235 1235',
      owner: 'Olar Marian',
      expiryAt: '2022-10-10',
      name: 'BT CARD',
      type: 'VISA',
    },
    {
      number: '1234 1235 1235 1235',
      owner: 'Olar Marian',
      expiryAt: '2022-10-10',
      name: 'BT CARD',
      type: 'VISA',
    },
  ];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.authService.getUserEmail().subscribe(
      (data) => {
        this.email = data;
      },
      () => {
        this.snackBar.open('Invalid email for profile.', '', {
          duration: 3000,
        });
      }
    );

    this.subs.sink = this.profileService.getProfile(this.email).subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        this.snackBar.open(error.message, '', { duration: 3000 });
      }
    );
  }

  reloadProfile(): void {
    console.log('reload profiles');
    this.profileService.loadProfile(this.email);
  }

  onAddressAdd(): void {
    console.log('add address');

    const dialogRef = this.dialog.open(AddressFormPopupComponent, {
      width: '450px',
      data: {
        title: 'Add new address',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data.address, 'address');

      if (data.address) {
        this.profileService.addAddress(data.address).subscribe(
          (response: any) => {
            if (response && !response.success) {
              this.snackBar.open(response.message, '', { duration: 3000 });
            } else {
              this.reloadProfile();
            }
          },
          (error) => {
            this.snackBar.open(error.message, '', { duration: 3000 });
          }
        );
      }
    });
  }

  onCreditCardAdd() {
    console.log('credit card add');

    const dialogRef = this.dialog.open(CardFormPopupComponent, {
      width: '450px',
      data: {
        title: 'Add new card',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data.card, 'card');

      if (data.card) {
        this.profileService.addCard(data.card).subscribe(
          (response: any) => {
            if (response && !response.success) {
              this.snackBar.open(response.message, '', { duration: 3000 });
            } else {
              this.reloadProfile();
            }
          },
          (error) => {
            this.snackBar.open(error.message, '', { duration: 3000 });
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
