import { CategoryEnum } from './category.enum';
import { PriceFilterModel } from './price-filter.model';

export interface FiltersMetadataModel {
  readonly categories: CategoryEnum[];
  readonly priceLimits: PriceFilterModel;
}
