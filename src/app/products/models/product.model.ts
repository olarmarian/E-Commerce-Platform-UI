export default interface ProductModel {
  readonly _id?: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly quantity: number;
  readonly image: string;
  readonly category: string;
}
