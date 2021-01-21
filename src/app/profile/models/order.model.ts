import ProductModel from 'src/app/products/models/product.model';
import { AddressModel } from './address.model';

export interface OrderModel {
  id: string;
  orderNumber: number;
  status: string;
  products: ProductModel[];
  address: AddressModel;
}
