import { SortEnum } from './sort-enum';
import { FiltersMetadataModel } from './filters-metadata.model';

export interface PageRequestModel {
    
    readonly filters: FiltersMetadataModel,
    readonly sort: SortEnum
}