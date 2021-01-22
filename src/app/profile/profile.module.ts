import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services/profile.service';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { GridContainerCardComponent } from './components/grid-container-card/grid-container-card.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressFormPopupComponent } from './components/address-form-popup/address-form-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardFormPopupComponent } from './components/card-form-popup/card-form-popup.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AddressCardComponent,
    GridContainerCardComponent,
    CreditCardComponent,
    AddressFormPopupComponent,
    CardFormPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
