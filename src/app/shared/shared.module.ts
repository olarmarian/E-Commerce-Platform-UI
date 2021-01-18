import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
