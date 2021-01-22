import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardModel } from '../../models/card.model';

export interface DialogData {
  title: string;
  card: CardModel;
}

@Component({
  selector: 'app-card-form-popup',
  templateUrl: './card-form-popup.component.html',
  styleUrls: ['./card-form-popup.component.scss'],
})
export class CardFormPopupComponent implements OnInit {
  private currentCardName: string = '';

  private cardModel: CardModel = {
    number: '',
    owner: '',
    expiryDate: '',
    type: '',
    name: '',
  };
  cardForm: FormGroup;

  submitted: boolean;

  constructor(
    private dialogRef: MatDialogRef<CardFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.submitted = false;

    if (this.data.card) {
      this.cardModel = this.data.card;
      this.currentCardName = this.data.card.name;
    }

    this.cardForm = new FormGroup({
      number: new FormControl(this.cardModel.number, [
        Validators.required,
        Validators.minLength(4 * 4),
        Validators.maxLength(4 * 4),
      ]),
      owner: new FormControl(this.cardModel.owner, Validators.required),
      expiryDate: new FormControl(this.cardModel.expiryDate, [
        Validators.required,
      ]),
      type: new FormControl(this.cardModel.type, Validators.required),
      name: new FormControl(this.cardModel.name, Validators.required),
    });

    this.cardForm.valueChanges.subscribe((card: CardModel) => {
      console.log(card, 'form');
      this.cardModel = {
        number: card.number,
        owner: card.owner,
        expiryDate: card.expiryDate,
        type: card.type,
        name: card.name,
      };
    });
  }

  onSaveClick() {
    if (this.cardForm.invalid) {
      this.submitted = true;
    } else {
      this.dialogRef.close({
        oldCardName: this.currentCardName,
        card: this.cardModel,
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
