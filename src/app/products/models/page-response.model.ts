import ProductModel from "./product.model";

export interface PageResponseModel{
    readonly products: ProductModel[]
}