import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressModel } from '../../models/address.model';
import { ProfileService } from '../../services/profile.service';
import { AddressFormPopupComponent } from '../address-form-popup/address-form-popup.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent {
  @Input('address') address: AddressModel;
  @Output('onProfileReload') reloadAddressesEmitter = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openEditAddressModal() {
    const dialogRef = this.dialog.open(AddressFormPopupComponent, {
      width: '400px',
      data: {
        title: 'Edit address: ' + this.address.name,
        address: this.address,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.address) {
        this.profileService
          .editAddress(data.oldAddressName, data.address)
          .subscribe(
            () => this.reloadAddressesEmitter.emit(),
            (error) => this.snackBar.open(error.message, '', { duration: 3000 })
          );
      }
    });
  }

  performDeleteAddress() {
    this.profileService.deleteAddress(this.address.name).subscribe(
      () => this.reloadAddressesEmitter.emit(),
      (error) => this.snackBar.open(error.message, '', { duration: 3000 })
    );
  }
}
