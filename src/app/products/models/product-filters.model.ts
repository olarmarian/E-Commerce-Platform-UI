import { CategoryEnum } from './category.enum';
import { PriceFilterModel } from './price-filter.model';

export interface ProductFiltersModel {
  readonly categories: CategoryEnum[];
  readonly priceLimits: PriceFilterModel;
}
