import { AddressModel } from './address.model';
import { OrderModel } from './order.model';

export interface ProfileModel {
  readonly _id?: string;
  readonly orders: OrderModel[];
  readonly reviews: [];
  readonly addresses: AddressModel[];
  readonly searches: [];
  readonly name: string;
  readonly email: string;
}
