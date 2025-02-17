export default interface ProductModel {
  readonly id?: number;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly quantity: number;
  readonly image: string;
  readonly category: string;
}
