import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './products.service';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule],
  declarations: [ProductsPageComponent, ProductCardComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
