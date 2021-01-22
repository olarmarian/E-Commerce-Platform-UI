import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressModel } from '../../models/address.model';

export interface DialogData {
  address: AddressModel;
  title: string;
}

@Component({
  selector: 'app-address-form-popup',
  templateUrl: './address-form-popup.component.html',
  styleUrls: ['./address-form-popup.component.scss'],
})
export class AddressFormPopupComponent implements OnInit {
  addressModel: AddressModel = {
    name: '',
    city: '',
    country: '',
    street: '',
    number: '',
  };

  private addressCurrentName: string = '';

  submitted: boolean;

  addressForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddressFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.submitted = false;

    if (this.data.address) {
      this.addressModel = this.data.address;
      this.addressCurrentName = this.data.address.name;
    }

    this.addressForm = new FormGroup({
      name: new FormControl(this.addressModel.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: new FormControl(this.addressModel.country, [
        Validators.required,
        Validators.minLength(1),
      ]),
      city: new FormControl(this.addressModel.city, [
        Validators.required,
        Validators.minLength(1),
      ]),
      street: new FormControl(this.addressModel.street, [
        Validators.required,
        Validators.minLength(1),
      ]),
      number: new FormControl(this.addressModel.number, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    this.addressForm.valueChanges.subscribe((address: AddressModel) => {
      console.log(address, 'form');
      this.addressModel = {
        name: address.name,
        city: address.city,
        country: address.country,
        number: address.number,
        street: address.street,
      };
    });
  }

  onSaveClick(): void {
    if (this.addressForm.invalid) {
      this.submitted = true;
    } else {
      this.dialogRef.close({
        oldAddressName: this.addressCurrentName,
        address: this.addressModel,
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
