import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../services/profile.service';
import { AddressFormPopupComponent } from '../address-form-popup/address-form-popup.component';

@Component({
  selector: 'app-grid-container-card',
  templateUrl: './grid-container-card.component.html',
  styleUrls: ['./grid-container-card.component.scss'],
})
export class GridContainerCardComponent {
  @Input('title') title: string;
  @Input('limitItems') limitItems: number;
  @Input('itemsNumber') itemsNumber: number;
  @Output('onAddClick') onAddClickEmitter = new EventEmitter();

  constructor() {}

  onAddClick() {
    this.onAddClickEmitter.emit();
  }
}
