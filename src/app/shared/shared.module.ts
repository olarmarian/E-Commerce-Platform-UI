import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
