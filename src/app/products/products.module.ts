import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './products.service';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SelectSortComponent } from './components/select-sort/select-sort.component';
import { PaginationActionsComponent } from './components/pagination-actions/pagination-actions.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    FormsModule,
    MatSliderModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule
  ],
  declarations: [
    ProductsPageComponent,
    ProductCardComponent,
    CheckboxFilterComponent,
    PriceFilterComponent,
    SelectSortComponent,
    PaginationActionsComponent,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
