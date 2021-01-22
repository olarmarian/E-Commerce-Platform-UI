import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardModel } from '../../models/card.model';
import { ProfileService } from '../../services/profile.service';
import { CardFormPopupComponent } from '../card-form-popup/card-form-popup.component';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  @Input('card') card: CardModel;
  @Output('onProfileReload') onProfileReloadEmitter = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openEditCardPopup(): void {
    console.log('open edit');

    const dialogRef = this.dialog.open(CardFormPopupComponent, {
      width: '450px',
      data: {
        title: 'Edit credit card',
        card: this.card,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.card) {
        this.profileService.editCard(data.oldCardName, data.card).subscribe(
          () => this.onProfileReloadEmitter.emit(),
          (error) => this.snackBar.open(error.message, '', { duration: 3000 })
        );
      }
    });
  }

  performDeleteCard(): void {
    this.profileService.deleteCard(this.card.name).subscribe(
      () => this.onProfileReloadEmitter.emit(),
      (error) => {
        this.snackBar.open(error.message, '', { duration: 3000 });
      }
    );
  }
}
