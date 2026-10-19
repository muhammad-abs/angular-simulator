import { IProduct } from './IProduct';

export interface IProductResponce {
  products: IProduct[],
  total: number,
  skip: number,
  limit: number
}
