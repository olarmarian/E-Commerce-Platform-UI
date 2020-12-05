import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './products.service';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  declarations: [
    ProductsPageComponent,
    ProductCardComponent,
    CheckboxFilterComponent,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
